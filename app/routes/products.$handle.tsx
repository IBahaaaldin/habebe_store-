import { Await, redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import Ratings, { ProductItem } from '~/components/ProductItem';
import Reviews from '~/components/MINE/Reviews';
// import { RecommendedProducts } from './_index';
import { Suspense } from 'react';
import type { RecommendedProductsQuery } from 'storefrontapi.generated';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';



export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `Hydrogen | ${data?.product.title ?? ''}` },
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
  const { handle } = params;
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

  const { title } = product;


  console.log(`%c${JSON.stringify(product)}`, 'color: blue; font-size: 20px;')
  console.log(`%c${JSON.stringify(similarProducts)}`, 'color: yellow; font-size: 20px;')

  const OptionImages = product.options.map((op: { optionValues: any[]; }) => op.optionValues.map((opv: { firstSelectableVariant: { image: any; }; }) => opv.firstSelectableVariant?.image));



  const availableColorImages = product.options
    .find(option => option.name === "Color")
    ?.optionValues
    .filter(value => value?.firstSelectableVariant.availableForSale)
    .map(value => value?.firstSelectableVariant?.image);

  console.log(availableColorImages);


  console.log(`%c${JSON.stringify(availableColorImages)}`, 'color: black; font-size: 20px;')


  return (
    <div className="SMALL_CONTAINER">



      <div className='flex lg:flex-row flex-col gap-[3%]'>
        {/* Product Image */}
        <ProductImage
          image={selectedVariant?.image}
          OtherImages={availableColorImages}
        />



        {/* Product Details */}
        <section className="flex flex-col gap-10 mt-5 w-full lg:max-w-1/2">
          <div className='flex flex-col gap-5'>
            <h1 className='md:text-5xl text-3xl'>{title}</h1>
            <span className="md:text-3xl text-xl">{selectedVariant?.price.currencyCode}{selectedVariant?.price.amount}</span>
          </div>




          <div className='flex flex-col gap-2 border-3 border-zinc-100 rounded-3xl p-4'>
            <span className='text-2xl font-bold'>Description: </span>

            <span className=" md:text-lg text-sm text-zinc-500">{product.description.slice(0, 155)}...</span>

          </div>


          <div className='flex flex-col gap-5'>
            <h4 className='text-2xl font-bold'>Main Notes</h4>
            <div className='flex flex-row gap-3'>
              {product.tags.map((tag: any) => (
                <span
                  key={tag}
                  className='font-semibold rounded-full border border-zinc-300 px-3 py-1 '>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* <div
            className='text-zinc-500 border-zinc-300 border-b pb-5 mb-5'
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          /> */}

          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
          />
        </section>
      </div>



      <Reviews
        Title={title}
        ProductId={product.id}
      />



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
  return (
    <div className="border-b border-black/30 pb-10">
      <h3 className='text-start w-full text-4xl mb-10 capitalize font-bold'>
        {Title}
      </h3>

      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={products}>
          {(response) => (
            <div className="GRID_CONTAINER overflow-scroll HIDDEN_SCROLL">
              {products.map((item: any) => (
                <ProductItem key={item.node.id} product={item.node} />
              ))}
            </div>
          )}
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

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
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

