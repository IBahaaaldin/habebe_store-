import { Analytics, getShopAnalytics, Image, useNonce } from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  Link,
  type LinksFunction,
} from 'react-router';
import type { Route } from './+types/root';
import favicon from '~/assets/favicon.svg';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import tailwindCss from './styles/tailwind.css?url';
import { PageLayout } from './components/PageLayout';
import { MAINMENU_AND_SUBMENU_QUERY } from '~/graphql/sharedQueries';
import { ContextProvider } from './lib/ContextProvider';


export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};




export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
];


export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const { storefront, env } = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}



async function loadCriticalData({ context }: Route.LoaderArgs) {
  const { storefront } = context;



  // Extracting first object as menuData to match the query instead of returning all as one object and then pick [0], [1]
  // Extracting second object as shopData
  const [menuData, shopData] = await Promise.all([
    storefront.query(MAINMENU_AND_SUBMENU_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        handle: 'main-menu',
      },
    }),
    storefront.query(SHOP_LOGO),
  ]);

  return {
    menuData,
    shopData
  };
}



function loadDeferredData({ context }: Route.LoaderArgs) {
  const { customerAccount, cart } = context;

  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
  };
}


// Layout component that includes the HTML structure
export function Layout({ children }: { children?: React.ReactNode }) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss}></link>
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}





// The main App component
export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');
  // console.log(`%c${JSON.stringify(data, null, 3)}`, 'color: white; font-size: 20px;')


  if (!data) {
    return <Outlet />;
  }

  return (
    <ContextProvider>
      <Analytics.Provider
        cart={data.cart}
        shop={data.shop}
        consent={data.consent}
      >
        <PageLayout {...data} header={data.menuData}>
          <Outlet />
        </PageLayout>
      </Analytics.Provider>
    </ContextProvider>
  );
}




// Error boundary for the root route
export function ErrorBoundary() {

  const data = useRouteLoaderData<RootLoader>('root');
  const shopData = data?.shopData;
  // console.log(`%c${JSON.stringify(shopData, null, 3)}`, 'color: white; font-size: 20px;')

  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;


  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }



  return (
    <div className="HOME_WRAPPER relative min-h-screen flex flex-col items-center justify-center text-center ">
      <h1 className="font-medium mb-4">404</h1>
      <h3 className="mb-8">Sorry, this page not found.</h3>
      <Link to="/" className="BUTTON2">
        Go back home
      </Link>


      <Image
        data={shopData?.shop.brand?.logo?.image || {}}
        className='absolute bottom-[5%] -left-[20%] -z-1 max-w-200 aspect-auto object-cover blur-2xl opacity-70'
      />
    </div>
  );
}


export const SHOP_LOGO = `#graphql
  query Shop {
      shop {
        brand {
          logo {
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
`;
