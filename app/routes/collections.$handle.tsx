import { Link, redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/collections.$handle';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import type { ProductFragment } from 'storefrontapi.generated';
import HeroSection from '~/components/MINE/HeroSection';
import Logos from '~/components/MINE/Logos';
import FilterSidebar from '~/components/MINE/FilterSidebar';



export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.collection.title ?? ''} Collection` }];
};



export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}



async function loadCriticalData({ context, params, request }: Route.LoaderArgs) {
  const { handle } = params;
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, { variables: { handle, ...paginationVariables } }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: collection });

  return {
    collection,
  };
}




function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const { collection } = useLoaderData<typeof loader>();



  return (
    <div className="collection">


      <HeroSection
        Title={collection.title}
        Description={collection.description}
        collection={collection}
        HeroImg={collection.image?.url}
      />

      <Logos />



      <div className='SMALL_CONTAINER'>

        <Link
          to="https://wa.me/+971561576657?text=I'm%20interested%20in%20your%20ad%20on%20Hydrogen"
          className='w-full lg:h-40 h-30 border border-zinc-100 bg-zinc-50 lg:rounded-4xl rounded-2xl flex items-center justify-center LINK_BUTTON'
          target='_blank'
          rel="noreferrer"
        >
          your ad here
        </Link>


        <div className="flex flex-row  w-full items-start gap-10">
          {/* <div className="self-start sticky top-10">
            <FilterSidebar
            // AvailableSize={collection.handle}
            // AvailableColor={collection.products.nodes}
            // AvailablePrice={collection.products.node}
            />
          </div> */}

          <PaginatedResourceSection<ProductFragment>
            connection={collection.products}
            resourcesClassName=""
          >
            {({ node: product, index }) => (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 8 ? 'eager' : undefined}
              />
            )}
          </PaginatedResourceSection>
        </div>

      </div>
    </div>
  );
}



export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    
    # Add variants with first: 1
    variants(first: 1) {
      nodes {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }

    # Add product options
    options {
      name
      values: optionValues {
        name
      }
    }
  }
` as const;



const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
  }
` as const;



const PRODUCT_QUERY = `#graphql
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
        variants(first: 1) {
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
` as const;


// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
export const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      # Add the image field here
      image {
        id
        url(transform: {maxWidth: 2000, maxHeight: 1000})
        altText
        width
        height
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
