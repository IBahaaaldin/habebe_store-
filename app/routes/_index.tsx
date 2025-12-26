import { Await, useLoaderData, Link } from 'react-router';
import type { Route } from './+types/_index';
import { Suspense } from 'react';
import type {
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { ProductItem } from '~/components/ProductItem';
import HeroSection from '~/components/MINE/HeroSection';
import Logos from '~/components/MINE/Logos';
import Reviews from '~/components/MINE/Reviews';

// For the collection section
import { getPaginationVariables } from '@shopify/hydrogen';
import { COLLECTIONS_QUERY, CollectionsSection } from './collections._index';
import HeaderText from '~/components/MINE/UI/HeaderText';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';





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
async function loadCriticalData({ context, request }: Route.LoaderArgs) {

  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });


  const [collectionsData, featuredData, recommendedProducts] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, { variables: paginationVariables }), // Fetching the Collections data also here because we cant use two loadCriticalData functions
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(RECOMMENDED_PRODUCTS_QUERY),
  ]);

  const collections = collectionsData.collections; // Used for Fetching Collections like => Men, Women, Unisex, ...
  const featuredCollection = featuredData.collections.nodes[0];


  return {
    collections, // Object called Collections
    featuredCollection,
    recommendedProducts,
  };
}


// Load data for rendering content below the fold.
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}



// The homepage component
export default function Homepage() {

  const data = useLoaderData<typeof loader>();

  console.log(`%c${JSON.stringify(data)}`, 'color: green; font-size: 20px;')
  console.log(`%c${JSON.stringify(data.recommendedProducts)}`, 'color: purple; font-size: 20px;')


  return (
    <div className="">

      <HeroSection collection={data.featuredCollection} />
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <Logos />

      <div className='SMALL_CONTAINER'>
        <div className='flex flex-col gap-10'>
          {data.recommendedProducts.collections.edges.map(({ node }: any) => (
            <RecommendedProducts
              key={node.id}
              products={node.products}
              Title={node.title}
            />
          ))}
        </div>


        <Link
          to="https://wa.me/+971561576657?text=I'm%20interested%20in%20your%20ad%20on%20Hydrogen"
          className='w-full lg:h-80 h-30 border border-zinc-100 bg-zinc-50 lg:rounded-4xl rounded-2xl flex items-center justify-center LINK_BUTTON'
          target='_blank'
          rel="noreferrer"
        >
          your ad here
        </Link>


        <div className='flex flex-col items-center justify-center'>
          <HeaderText HEAD="Collections" />
          <CollectionsSection collections={data.collections.nodes} />
        </div>

        <Reviews />
      </div>
    </div>
  );
}



export function RecommendedProducts({
  products,
  Title,
}: {
  products: any; // already resolved products object, not a promise
  Title: string;
}) {

  console.log(`%c${JSON.stringify(products)}`, 'color: red; font-size: 20px;')

  return (
    <div className="border-b border-black/30 pb-10">
      <div className='flex flex-row justify-between items-end lg:mb-10 mb-5'>
        <h3 className='text-start w-full lg:text-4xl text-2xl capitalize font-bold'>
          {Title}
        </h3>


        <Link
          className='LINK_BUTTON'
          prefetch="intent"
          to={`/collections/${Title.toLowerCase()}`}
        >
          See More
        </Link>
      </div>


      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={products}>
          {(response) => (
            <div className="HIDDEN_SCROLL GRID_CONTAINER overflow-scroll ">
              {response
                ? response.edges.slice(0, 6).map((product: any) => (
                  <ProductItem
                    key={product.id}
                    product={product.node}
                  />
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
  query RecommendedProducts {
    collections(first: 5) {
      edges {
        node {
          id
          title
          handle
          products(first: 5) {
            edges {
              node {
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
                variants (first: 1) {
                  nodes {
                    id
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
                options {
                  name
                  values: optionValues {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }

` as const;




/*
  * this is the original query to fetch products

  products(first: 10) {
    edges {
      node {
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
    }
  }
*/