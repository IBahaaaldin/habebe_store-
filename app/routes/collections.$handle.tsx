import { redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/collections.$handle';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import type { ProductFragment } from 'storefrontapi.generated';
import { AllCategories, CollectionsNewHero } from '~/components/MINE/CollectionsHero';
import { MAINMENU_AND_SUBMENU_QUERY } from './collections._index';
import MainBanners, { CasualBanners } from '~/components/MINE/AdsSections';
import BestSeller from '~/components/MINE/BestSeller';
import { useState } from 'react';



export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `HABEBE | ${data?.collection.title ?? ''} Collection` }];
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
    pageBy: 16,
  });


  if (!handle) {
    throw redirect('/collections');
  }



  // Promise.all Always returns an array
  // Get collection data and main menu 
  // Filter the main menu to get the specific collection by its TITLE
  const [
    { collection },
    { menu },
  ] = await Promise.all([
    storefront.query(COLLECTION_QUERY, { variables: { handle, ...paginationVariables } }),
    storefront.query(MAINMENU_AND_SUBMENU_QUERY, { variables: { handle: 'main-menu' } }),
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
    menu
  };
}




function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const { collection, menu } = useLoaderData<typeof loader>();


  // The title of the collection is used to filter the main menu 
  // So both the collection title and the menu item title must be the same in shopify
  const specificMenu =
    menu?.items?.filter((menuItem: any) => menuItem.title === collection.title)[0]?.items ??
    menu?.items[0]?.items.filter((menuItem: any) => menuItem.title === collection.title)[0]?.items


  // BANNERS for 3th level nested menus if NOT then 2nd level
  const bannersArray =
    menu?.items.filter((item: { title: any; }) => item.title === collection.title)[0]?.resource?.mainBanners?.references?.nodes ?? // 2nd level menu
    menu?.items[0]?.items.filter((item: { title: any; }) => item.title === collection.title)[0]?.resource?.mainBanners?.references?.nodes // 3th level menu (fashion)



  const [index, setIndex] = useState(0);
  // Demo data: 10 elements
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    text: `Item ${i + 1}`,
    color: i % 2 === 0 ? 'bg-blue-400' : 'bg-indigo-500',
  }));

  const itemsToShow = 4;
  const maxIndex = items.length - itemsToShow;

  const nextSlide = () => {
    // If at the end, jump back to start
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    // If at the start, jump to the last possible view
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="SEC_COL_CONTAINER">


      {/* Being displayed only in each collection */}
      <CollectionsNewHero
        Title={collection.title}
        Description={collection.description}
        Collections={collection as any}
        HeroImg={collection.image?.url}
        subTwoMenus={specificMenu.slice(0, 2)}
      />


      <AllCategories
        allSubMenus={specificMenu}
      />



      <div className="relative w-full max-w-5xl mx-auto overflow-hidden bg-gray-100 p-4 rounded-xl">
        {/* Wrapper */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * (100 / itemsToShow)}%)` }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-[25%] px-2" // Each item is 1/4 width
              // className="min-w-[25%] px-2" // Each item is 1/4 width
            >
              <div className={`h-40 ${item.color} flex items-center justify-center text-white font-bold rounded-lg shadow-md`}>
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg text-gray-800 p-3 rounded-full z-10"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg text-gray-800 p-3 rounded-full z-10"
        >
          ❯
        </button>
      </div>

      <MainBanners
        bannerArray={bannersArray}
      />

      <div className='space-y-5'>


        <BestSeller
          products={collection.products}
          Handle={collection.handle}
          collectionTitle={collection.title}
        />

        <CasualBanners collectionHandle='' bannerArray={bannersArray} />

        <PaginatedResourceSection<ProductFragment>
          connection={collection.products}
          resourcesClassName=""
        >
          {({ node: product, index }) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 16 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>

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

    media(first: 10) {
      nodes {
        mediaContentType
        alt
        ... on MediaImage {
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



const SUB_COLLECTION_QUERY = `#graphql
  query SubCollections(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(query: $handle + "-collection") {
      edges {
        node {
          id
          handle
          title
          image {
            id
            url(transform: {maxWidth: 2000, maxHeight: 1000})
            altText
            width
            height
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
