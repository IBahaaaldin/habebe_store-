import { Link, redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/collections.$handle';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import type { ProductFragment } from 'storefrontapi.generated';
import HeroSection, { AllCategories } from '~/components/MINE/HeroSection';
import { MAINMENU_AND_SUBMENU_QUERY } from './collections._index';
import { SmallHeaderText } from '~/components/MINE/UI/HeaderText';
import { useState, useEffect } from 'react';
import MainAdsSection from '~/components/MINE/AdsSections';



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

  // console.log(`%c${JSON.stringify(collection)}`, 'color: white; font-size: 30px;')


  // The title of the collection is used to filter the main menu 
  // So both the collection title and the menu item title must be the same in shopify
  const specificMenu = menu.items.filter((menuItem: any) => menuItem.title === collection.title)



  const AdsArray = [
    "/Images/collectionBanner.png",
    "/Images/collectionBanner2.png",
    "/Images/collectionBanner3.png",
  ]


  return (
    <div className="SEC_COL_CONTAINER">


      {/* Being displayed only in each collection */}
      <HeroSection
        Title={collection.title}
        Description={collection.description}
        Collections={collection as any}
        HeroImg={collection.image?.url}
      />


      {specificMenu.length > 0 &&
        <AllCategories
          allMenus={specificMenu[0]?.items}
        />
      }


      <div className='space-y-10'>
        <MainAdsSection
          Array={AdsArray}
        />



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
