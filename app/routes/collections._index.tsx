import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/collections._index';
import { Image } from '@shopify/hydrogen';
import type { CollectionFragment } from 'storefrontapi.generated';
import HeaderText from '~/components/MINE/UI/HeaderText';



export async function loader(args: Route.LoaderArgs) {
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}


async function loadCriticalData({ context }: Route.LoaderArgs) {


  const MainCollections = ([
    context.storefront.query(MAINMENU_QUERY, {
      variables: { handle: 'main-menu' }
    }),
  ]);


  return {
    MainCollections
  };
}



export default function Collections() {
  const data = useLoaderData<typeof loader>();

  console.log(`%c${JSON.stringify(data)}`, 'color: purple; font-size: 20px;')
  // const collections = data.collections.nodes;



  return (
    <div></div>
    // <section>

    //   <HeaderText HEAD='Collections' />
    //   <div className="relative flex flex-col lg:gap-3 gap-1">
    //     {collections.map((collection, index) => {
    //       const isEvenPair = Math.floor(index / 2) % 2 === 0; // Determines if it's the first or second pair in a set of four
    //       const isFirstInPair = index % 2 === 0; // Determines if it's the first item in a pair

    //       let firstItemWidth = 'w-1/3';
    //       let secondItemWidth = 'w-2/3';

    //       if (!isEvenPair) { // For the second pair (index 2, 3, 6, 7, etc.)
    //         firstItemWidth = 'w-2/3';
    //         secondItemWidth = 'w-1/3';
    //       }

    //       return (
    //         <div key={collection.id} className={`flex flex-row lg:gap-3 gap-1 ${isFirstInPair ? 'flex-row' : 'flex-row-reverse'}`}>
    //           <div className={`${isFirstInPair ? firstItemWidth : secondItemWidth}`}>
    //             <CollectionItem collection={collection} index={index} />
    //           </div>
    //           <div className={`${isFirstInPair ? secondItemWidth : firstItemWidth}`}>
    //             {collections[index + 1] && <CollectionItem collection={collections[index + 1]} index={index + 1} />}
    //           </div>
    //         </div>
    //       );
    //     }).filter((_, index) => index % 2 === 0)} {/* Render only even indices to group pairs */}
    //   </div>
    // </section>
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
      <div className='max-h-100 h-full lg:rounded-3xl rounded-xl overflow-hidden'>
        {collection?.image && (
          <Image
            className='object-cover hover:scale-110 duration-500 h-full -z-1'
            alt={collection.image.altText || collection.title}
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
          />
        )}
      </div>
      <h2 className='absolute z-1 bg-green-700/40 backdrop-blur-sm px-3 py-2 capitalize font-bold lg:top-10 top-5 lg:left-10 left-5 lg:text-3xl text-xl text-white rounded-full'>
        {collection.title}
      </h2>
    </Link>
  );
}



// Used this primarily in the header menu to fetch collections & used also in collections.$handle.tsx to filter it and get products of specific collection


// ? The extracying name for this in the storefront is like {menu} = await storefront.query(...) but here we are using {mainMenu} to avoid confusion with other menu variables

export const MAINMENU_AND_SUBMENU_QUERY = `#graphql
  query MainMenu($handle: String!) {
    menu(handle: $handle) {
      title
      # Fetch mainmenu items
      items {
        id
        title
        url
        resource {
          ... on Collection {
            handle
            title
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
        # Fetch submenu items
        items {
          id
          title
          url
          resource {
            ... on Collection {
              handle
              title
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
    }
    shop {
      name
      brand {
        logo {
          image {
            url
            altText
            width
            height
          }
        }
        shortDescription
        slogan
      }
    }
  }
` as const;



export const MAINMENU_QUERY = `#graphql
  query MainMenu($handle: String!) {
    menu(handle: $handle) {
      title
      items {
        id
        title
        url
        resource {
          ... on Collection {
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
  }
` as const;



export const MAINMENU_AND_PRODUCTS_QUERY = `#graphql
  query MainMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        resource {
          # // Fetch collection details
          ... on Collection {
            id
            title
            description
            handle
            image {
              id
              url
              altText
              width
              height
            }
            # // Fetch products associated with the collection
            products(first: 10) {
              nodes {
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
                variants(first: 5) {
                  nodes {
                    id
                    availableForSale
                    title
                    sku
                    price {
                      amount
                      currencyCode
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
