import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/collections._index';
import { getPaginationVariables, Image } from '@shopify/hydrogen';
import type { CollectionFragment } from 'storefrontapi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';



export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context, request }: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{ collections }] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return { collections };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}

export default function Collections() {
  const { collections } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-3 p-5 bg-zinc-100 rounded-4xl">
      {/* <PaginatedResourceSection<CollectionFragment>
        connection={collections}
        resourcesClassName=""
      >
        {({ node: collection, index }) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            index={index}
          />
        )}
      </PaginatedResourceSection> */}



      <div className="flex flex-row gap-3 h-full">
        <div className='w-1/3 min-h-100'>
          {collections.nodes.slice(0, 1).map((collection, index) => (
            <CollectionItem key={collection.id} collection={collection} index={index} />
          ))}
        </div>


        <div className='w-2/3 min-h-100'>
          {collections.nodes.slice(1, 2).map((collection, index) => (
            <CollectionItem key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </div>


      <div className="flex flex-row gap-3 h-full">

        <div className='w-2/3 min-h-100'>
          {collections.nodes.slice(1, 2).map((collection, index) => (
            <CollectionItem key={collection.id} collection={collection} index={index} />
          ))}
        </div>

        <div className='w-1/3 min-h-100'>
          {collections.nodes.slice(0, 1).map((collection, index) => (
            <CollectionItem key={collection.id} collection={collection} index={index} />
          ))}
        </div>

      </div>



    </div>
  );
}



function CollectionItem({ collection, index, }: { collection: CollectionFragment; index: number; }) {
  return (
    <Link
      className="relative h-full rounded-4xl overflow-hidden block"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection?.image && (
        <Image
          className='h-full object-cover hover:scale-110 duration-500'
          alt={collection.image.altText || collection.title}
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
        />
      )}
      <h2 className='absolute uppercase top-10 left-10 text-3xl rounded-full'>{collection.title}</h2>
    </Link>
  );
}



export const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
