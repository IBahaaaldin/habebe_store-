import { Await, useLoaderData, Link } from 'react-router';
import type { Route } from './+types/_index';
import { Suspense } from 'react';
import { Image } from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { ProductItem } from '~/components/ProductItem';
import HeroSection from '~/components/MINE/HeroSection';
import Logos from '~/components/MINE/Logos';
import Reviews from '~/components/MINE/Reviews';
import CollectionSection from '~/components/MINE/CollectionSection';





// // This is for the Collection only as it should be a standalone 
import { getPaginationVariables } from '@shopify/hydrogen';
import type { CollectionFragment } from 'storefrontapi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { COLLECTIONS_QUERY } from './collections._index';


// MOve other stuff in the collection.index

export async function loaderCollection(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredDataCollection(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalDataCollection(args);

  return { ...deferredData, ...criticalData };
}



async function loadCriticalDataCollection({ context, request }: Route.LoaderArgs) {

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
function loadDeferredDataCollection({ context }: Route.LoaderArgs) {
  return {};
}





export function Collections() {
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







// Set the seo meta tags for the homepage
export const meta: Route.MetaFunction = () => [
  { title: 'Hydrogen | Home' },
  { name: 'description', content: 'Welcome to our awesome shop — discover featured collections and great products!' },
];



// Handle HTTP caching for the homepage
export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}



/*
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
*/
async function loadCriticalData({ context }: Route.LoaderArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}



/*
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}



// The homepage component
export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HeroSection collection={data.featuredCollection} />
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <Logos />

      <div className='productsContainer'>
        <RecommendedProducts products={data.recommendedProducts} />
        <RecommendedProducts products={data.recommendedProducts} />
        <RecommendedProducts products={data.recommendedProducts} />
        <RecommendedProducts products={data.recommendedProducts} />
      </div>


      <Collections />

      <Reviews />
    </div>
  );
}



function FeaturedCollection({ collection, }: { collection: FeaturedCollectionFragment; }) {


  if (!collection) return null;
  const image = collection?.image;


  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}



function RecommendedProducts({ products }: { products: Promise<RecommendedProductsQuery | null>; }) {

  return (
    <div className="recommended-products">
      <h3 className='text-center w-full text-3xl mb-5 uppercase font-bold'>Recommended Products</h3>


      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="flex flex-row gap-5 overflow-scroll HIDDEN_SCROLL">
              {response
                ? response.products.nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>


    </div>
  );
}



const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
