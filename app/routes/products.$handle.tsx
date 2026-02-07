import { Await, redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Money,
} from '@shopify/hydrogen';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { ProductItem } from '~/components/ProductItem';
import Reviews from '~/components/MINE/Reviews';
import { Suspense, useState } from 'react';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';
import Prices from '~/components/MINE/UI/Prices';
import HeaderText, { SmallHeaderText } from '~/components/MINE/UI/HeaderText';



export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `HABEBE | ${data?.product.title ?? ''}` },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};



export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}


async function loadCriticalData({ context, params, request }: Route.LoaderArgs) {
  const { handle } = params; // Gettign the product's HANDLE from the url
  const { storefront } = context;

  if (!handle) {
    throw new Error("Missing product handle");
  }


  // “Get the product with this URL name (handle), and return the exact variant based on what the customer selected.”
  // /products/black-tshirt?size=M&color=Black
  // handle = "black-tshirt"
  // selectedOptions = [{ name: "Size", value: "M" }, { name: "Color", value: "Black" }]
  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);


  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }


  // get similar products after fetching the main product
  const { product: productWishCollections } = await storefront.query(SIMILAR_PRODUCTS_QUERY, {
    variables: { productId: product.id },
  })

  const similarProducts = productWishCollections?.collections.edges[0]?.node.products.edges

  return {
    product,
    similarProducts: similarProducts || [],
  };
}


function loadDeferredData({ context, params }: Route.LoaderArgs) {
  return {};
}



export default function Product() {
  const { product, similarProducts } = useLoaderData<typeof loader>();


  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, } = product;



  // Get MEDIA to get the other images
  const productMedia = product.media.edges // Second Image only in the media
  // console.log(`%c${JSON.stringify(productMedia, null, 3)}`, 'color: green; font-size: 20px;')

  /// Show Full description 
  const [more, setMore] = useState(150)




  // const urlParams = new URLSearchParams(window.location.search);
  // const targetCurrency = urlParams.get('cur') || 'USD'; // Default to USD

  // // 2. Fetch the rate and convert
  // const usdPrice = 100; // Your default price

  // if (targetCurrency !== 'USD') {
  //   // fetch(`https://api.frankfurter.app/latest?from=USD&to=${targetCurrency}`)
  //   fetch(`https://api.frankfurter.app/latest?from=USD&to=CAD`)
  //     .then(async (res) => {
  //       if (!res.ok) {
  //         console.error('Failed to fetch exchange rate:', res.statusText);
  //         return;
  //       }
  //       // Cast the JSON to a known shape so TypeScript can infer the rates ologbject
  //       const data = (await res.json()) as { rates?: Record<string, number> } | null;
  //       const rate = data?.rates?.[targetCurrency];
  //       if (typeof rate !== 'number') {
  //         console.error('Invalid or missing exchange rate for', targetCurrency, data);
  //         return;
  //       }
  //       const convertedPrice = (usdPrice * rate).toFixed(2);
  //       console.log(`Price in ${targetCurrency}: ${convertedPrice}`);
  //       console.log(`%c${JSON.stringify(targetCurrency, null, 3)}`, 'color: white; font-size: 20px;')
  //       // Display this on your page
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching exchange rate:', err);
  //     });
  // }



  return (
    <div className='flex flex-col gap-10'>
      <div className='flex md:flex-row flex-col gap-x-7'>
        {/* /// Product Image */}
        <ProductImage
          image={product?.featuredImage}
          productMedia={productMedia}
          selectedVariant={selectedVariant}
        />


        {/* /// Product Details */}
        <section className="flex flex-col gap-7 mt-5 w-full md:w-1/2">
          <article className='flex flex-col gap-2'>
            <h3>{title}</h3>

            <Prices
              isBig={true}
              price={selectedVariant.price.amount}
            />

          </article>




          <article className='flex flex-col gap-2 border-3 border-zinc-100 md:rounded-3xl rounded-2xl p-4'>
            <p className='font-medium'>Description: </p>

            <span className=" text-zinc-500">
              {product.description.slice(0, more)}
              <button
                type="button"
                aria-label="Show full description"
                className="ml-1 underline text-blue-500 cursor-pointer"
                onClick={() => setMore(product.description.length)}
              >
                {more !== product.description.length && "More"}
              </button>
            </span>
          </article>


          {/* Main notes (TAGS) */}
          {/* <article className='flex flex-col gap-2'>
            <p>Main Notes</p>
            <div className='overflow-x-scroll HIDDEN_SCROLL flex flex-row gap-2'>
              {product.tags.map((tag: any) => (
                <span
                  key={tag}
                  className='text-nowrap md:rounded-3xl rounded-2xl border border-zinc-300 px-3 py-1 '>
                  {tag}
                </span>
              ))}
            </div>
          </article> */}

          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
          />
        </section>
      </div>


      <SimilarProducts
        Title={"Similar Products"}
        products={similarProducts}
      />


      {/* Used for analytics only */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}



function SimilarProducts({ products, Title }: { products: any; Title: string; }) {


  if (Array.isArray(products) && !products.length) return null;


  return (
    <div className="border-b border-black/30 pb-10 flex flex-col gap-3">
      <HeaderText HEAD={Title} />


      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={products}>
          <div className="PRODUCTS_GRID_CONTAINER overflow-scroll HIDDEN_SCROLL">
            {products.map((item: any) => (
              <ProductItem key={item.node.id} product={item.node} />
            ))}
          </div>
        </Await>
      </Suspense>
    </div>
  );
}




const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    tags
    encodedVariantExistence
    encodedVariantAvailability
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
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

// const PRODUCT_QUERY = `#graphql
//   query Product(
//     $country: CountryCode
//     $handle: String!
//     $language: LanguageCode
//     $selectedOptions: [SelectedOptionInput!]!
//   ) @inContext(country: $country, language: $language) {
//     product(handle: $handle) {
//       ...Product
//       featuredImage {
//         id  
//         url
//         width
//         height
//       }
//       media(first: 10) {
//         edges {
//           node {
//             mediaContentType
//             alt
//             ... on MediaImage {
//               image {
//                 id  
//                 url
//                 width
//                 height
//               }
//             }
//             ... on Video {
//               sources {
//                 url
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   ${PRODUCT_FRAGMENT}
// ` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
      featuredImage {
        __typename
        id  
        url
        width
        height
      }
      media(first: 10) {
        edges {
          node {
            mediaContentType
            alt
            ... on MediaImage {
              __typename
              image {
                id  
                url
                width
                height
              }
            }
            ... on Video {
              sources {
                url
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const SIMILAR_PRODUCTS_QUERY = `#graphql
  query SimilarProducts($productId: ID!) {
    product(id: $productId) {
      collections(first: 1) {
        edges {
          node {
            products(first: 10, sortKey: PRODUCT_TYPE ) {
              edges {
                node {
                  id
                  title
                  handle
                   # /// Fetch media to display other images for the same product
                  media(first: 3) { # For the hover effect
                    nodes {
                      mediaContentType
                      alt
                      ... on MediaImage {
                        image {
                          id
                          url
                          altText
                          width
                          height
                        }
                      }
                      ... on Video {
                        sources {
                          url
                        }
                      }
                      # You can add 3DModel if needed
                    }
                  }
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
  }
` as const;
