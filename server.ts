// Virtual entry point for the app
import { storefrontRedirect } from '@shopify/hydrogen';
import { createRequestHandler } from '@shopify/hydrogen/oxygen';
import { createHydrogenRouterContext } from '~/lib/context';
import { getLocaleFromRequest } from '~/lib/i18n';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      /**
       * CSRF Fix: Normalize the origin header to match the host.
       * This prevents the "host header does not match origin" error.
       */
      const url = new URL(request.url);
      const modifiedRequest = new Request(request, {
        headers: new Headers(request.headers),
      });

      if (modifiedRequest.headers.has('origin')) {
        modifiedRequest.headers.set('origin', url.origin);
      }

      const hydrogenContext = await createHydrogenRouterContext(
        modifiedRequest,
        env,
        executionContext,
        {
          i18n: getLocaleFromRequest(modifiedRequest),
        }
      );

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        // eslint-disable-next-line import/no-unresolved
        build: await import('virtual:react-router/server-build'),
        mode: process.env.NODE_ENV,
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(modifiedRequest);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      if (response.status === 404) {
        return storefrontRedirect({
          request: modifiedRequest,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', { status: 500 });
    }
  },
};