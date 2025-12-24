import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/collections._index';
import { getPaginationVariables, Image } from '@shopify/hydrogen';
import type { CollectionFragment } from 'storefrontapi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import CollectionSection from '~/components/MINE/CollectionSection';



export async function loader(args: Route.LoaderArgs) {
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}


async function loadCriticalData({ context, request }: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [collectionsData] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  const collections = collectionsData.collections; // Used for Fetching Collections like => Men, 

  return { collections };
}



export default function Collections() {
  const data = useLoaderData<typeof loader>();




  return (
    <div className='productsContainer'>
      <CollectionsSection collections={data.collections.nodes} />
    </div>
  );
}



export function CollectionsSection({ collections }: { collections: CollectionFragment[] }) {
  return (
    <section>
      <div className='relative flex flex-col gap-3 '>
        <div className="flex flex-row gap-3 ">
          <div className='w-1/3 '>
            {collections.slice(0, 1).map((collection, index) => (
              <CollectionItem key={collection.id} collection={collection} index={index} />
            ))}
          </div>


          <div className='w-2/3 '>
            {collections.slice(1, 2).map((collection, index) => (
              <CollectionItem key={collection.id} collection={collection} index={index} />
            ))}
          </div>
        </div>


        <div className="flex flex-row gap-3 ">

          <div className='w-2/3 '>
            {collections.slice(2, 3).map((collection, index) => (
              <CollectionItem key={collection.id} collection={collection} index={index} />
            ))}
          </div>

          <div className='w-1/3 '>
            {collections.slice(3, 4).map((collection, index) => (
              <CollectionItem key={collection.id} collection={collection} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function CollectionItem({ collection, index, }: { collection: CollectionFragment; index: number; }) {
  return (
    <Link
      className="relative"
      key={collection.id}
      to={`/collections/${collection.handle}`}
    // prefetch="intent"
    >
      <div className='max-h-100 h-full rounded-4xl overflow-hidden'>
        {collection?.image && (
          <Image
            className='object-cover hover:scale-110 duration-500 h-full'
            alt={collection.image.altText || collection.title}
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
          />
        )}
      </div>
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
