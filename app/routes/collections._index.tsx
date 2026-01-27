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
  const MainCollections = await context.storefront.query(MAINMENU_QUERY, {
    variables: { handle: 'main-menu' },
  });

  return { MainCollections };
}



export default function Collections() {
  const { MainCollections } = useLoaderData<typeof loader>();

  const items = MainCollections.menu.items;
  console.log(`%c${JSON.stringify(items, null, 3)}`, 'color: white; font-size: 20px;')



  return (
    <div className="flex flex-col gap-5 ">
      <h3 className="font-semibold">Discover our collections</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {items.map((item: any) => {
          const image = item.resource?.image;

          return (
            <Link
              to={`${item.resource.handle}`}
              key={item.id}
              className="flex flex-col gap-2 group md:rounded-3xl rounded-2xl overflow-hidden border-7 border-zinc-100 bg-zinc-100 hover:shadow-lg shadow-xs duration-500"
            >
              <figure className="md:h-60 h-40 bg-gray-100 overflow-hidden md:rounded-3xl rounded-2xl">
                {image ? (
                  <Image
                    data={image}
                    alt={image.altText ?? item.title}
                    className="h-full w-full object-cover group-hover:scale-105 duration-500 "
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </figure>

              <p className="hover:underline font-medium p-3 text-center bg-white md:rounded-3xl rounded-2xl ">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}



function CollectionItem({ collection, index, }: { collection: CollectionFragment; index: number; }) {
  return (
    <Link
      className="relative"
      key={collection.id}
      to={`/${collection.handle}`}
    // prefetch="intent"
    >
      <div className='max-h-100 h-full md:rounded-3xl rounded-2xl overflow-hidden'>
        {collection?.image && (
          <Image
            className='object-cover hover:scale-110 duration-500 h-full -z-1'
            alt={collection.image.altText || collection.title}
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
          />
        )}
      </div>
      <h2 className='absolute z-1 bg-green-700/40 backdrop-blur-sm px-3 py-2 capitalize font-medium lg:top-10 top-5 lg:left-10 left-5 lg:text-3xl text-xl text-white rounded-full'>
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
      # /// ===== LEVEL 1 =====
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
            # /// Fetch metafield for main banners only for 2nd level array
            mainBanners: metafield(namespace: "custom", key: "main_banners") {
              references(first: 10) {
                nodes {
                  ... on MediaImage {
                    image {
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
        }
        # /// # ===== LEVEL 2 =====
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
              # /// Fetch metafield for main banners only for 3th level array
              mainBanners: metafield(namespace: "custom", key: "main_banners") {
                references(first: 10) {
                  nodes {
                    ... on MediaImage {
                      image {
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
          }
          # /// ===== LEVEL 3 =====
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
                # /// Fetch metafield for main banners only for 2nd level array
                mainBanners: metafield(namespace: "custom", key: "main_banners") {
                  references(first: 10) {
                    nodes {
                      ... on MediaImage {
                        image {
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
            handle
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
          # /// Fetch collection details
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
            # /// Fetch metafield for main banner
            mainBanners: metafield(namespace: "custom", key: "main_banners") {
              references(first: 10) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
            scrollBanners: metafield(namespace: "custom", key: "scroll_banners") {
              references(first: 10) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
            gridBanners: metafield(namespace: "custom", key: "grid_banners") {
              references(first: 10) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
            platinumBanners: metafield(namespace: "custom", key: "platinum_banners") {
              references(first: 10) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
            casualBanners: metafield(namespace: "custom", key: "casual_banners") {
              references(first: 4) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
            # /// Fetch products associated with the collection
            products(first: 10) {
              nodes {
                id
                title
                handle
                # /// Fetch media to display other images for the same product
                media(first: 10) {
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
