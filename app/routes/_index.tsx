import { Await, useLoaderData, Link } from 'react-router';
import type { Route } from './+types/_index';
import { Suspense } from 'react';
import { ProductItem } from '~/components/ProductItem';
import HeroSection, { AllCategories, TwoGrids } from '~/components/MINE/HeroSection';
import Reviews from '~/components/MINE/Reviews';

// For the collection section
import { MAINMENU_AND_PRODUCTS_QUERY } from './collections._index';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';
import FAQs from '~/components/MINE/FAQs';
import HeaderText, { SmallHeaderText } from '~/components/MINE/UI/HeaderText';
import MainAdsSection, { AdsSection } from '~/components/MINE/AdsSections';





// Set the seo meta tags for the homepage
export const meta: Route.MetaFunction = () => [
  { title: 'Hydrogen | Home' },
  { name: 'description', content: 'Welcome to our awesome shop — discover featured collections and great products!' },
];



// Handle HTTP caching for the homepage
export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}



async function loadCriticalData({ context }: Route.LoaderArgs) {

  // Fetch the main menu and its associated products (only 10 products per collection)
  const [MainMenu] = await Promise.all([
    context.storefront.query(MAINMENU_AND_PRODUCTS_QUERY, { variables: { handle: 'main-menu' } }),
  ]);

  const MainCollections = MainMenu.menu.items.map((item: any) => item.resource); // Used for Fetching Collections like => Men, Women, Unisex, ...


  return {
    MainCollections, // Object called Collections
  };
}


// Load data for rendering content below the fold.
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}



// The homepage component
export default function Homepage() {

  const { MainCollections } = useLoaderData<typeof loader>();
  // console.log(`%c${JSON.stringify(MainCollections, null, 3)}`, 'color: red; font-size: 20px;')


  return (
    <div className='space-y-10'>
      <HeroSection
        Collections={MainCollections}
      />


      {/* Render the CollectionsSection component, passing the collections data */}
      {MainCollections.length > 0 &&
        <TwoGrids
          subTwoMenus={MainCollections.slice(0, 2)}
        />
      }


      {MainCollections.length > 2 &&
        <AllCategories
          allMenus={MainCollections.slice(2)}
        />
      }


      {/* <Collections /> */}
      {MainCollections.map((collection: any) => (
        <div key={collection.id} className="mb-10">
          <MainCollectionsProductsSample
            mainBanners={collection?.mainBanners?.references?.nodes} // Get the matafield called "main_banners" that has the banners for each collection (if we assigned it to it)
            products={collection.products} // 
            collectionTitle={collection.title}
            Handle={collection.handle}
          />
        </div>
      ))}

      <FAQs />
      <Reviews />
    </div>
  );
}



// MainCollectionsProductsSample component
export function MainCollectionsProductsSample({ products, collectionTitle, Handle, mainBanners }: { products: any; collectionTitle: string; Handle: string; mainBanners?: any; }) {



  const MenAds = [
    "/Images/1.png",
    "/Images/1.png",
    "/Images/1.png",
  ]
  const WomenAds = [
    "/Images/2.png",
    "/Images/2.png",
    "/Images/2.png",
  ]
  const ToolsAds = [
    "/Images/3.png",
    "/Images/3.png",
    "/Images/3.png",
  ]
  const ElectronicsnAds = [
    "/Images/3.png",
    "/Images/3.png",
    "/Images/3.png",
  ]

  const KidsAds = [
    "/Images/collectionBanner.png",
    "/Images/collectionBanner2.png",
    "/Images/collectionBanner3.png",
  ]

  const ToolsnAds = [
    "/Images/collectionBanner.png",
    "/Images/collectionBanner2.png",
    "/Images/collectionBanner3.png",
  ]



  return (
    <section className="flex flex-col gap-5 pb-10">

      {/* /// ADS Section */}
      {/* {mainBanners.length > 0 &&
        <MainAdsSection Array={mainBanners} />
      } */}


      {/*  // */}
      <div className='flex flex-row justify-between items-start'>
        <SmallHeaderText HEAD={`${collectionTitle}${collectionTitle.endsWith('s') ? "'" : "'s"} Collection`} />

        <Link
          className='LINK'
          prefetch="intent"
          to={`/collections/${Handle}`}
        >
          See More
        </Link>
      </div>


      {/* /// ADS Section */}
      {/* {(Handle === 'men') &&
        <AdsSection Array={MenAds} Title={`${collectionTitle}'s Features`} ColHandle={Handle} />
      }
      {(Handle === 'women') &&
        <AdsSection Array={WomenAds} Title={`${collectionTitle}'s Features`} ColHandle={Handle} />
      }
      {(Handle === 'tools') &&
        <AdsSection Array={ToolsAds} Title={`${collectionTitle}'s Features`} ColHandle={Handle} />
      }
      {(Handle === 'electronics') &&
        <AdsSection Array={ElectronicsnAds} Title={`${collectionTitle}'s Features`} ColHandle={Handle} />
      }




      {(Handle === 'kids') &&
        <MainAdsSection Array={KidsAds} />
      }
      {(Handle === 'tools') &&
        <MainAdsSection Array={ToolsnAds} />
        } */}





      {/* /   */}
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={products}>
          {(response) => (
            <div className="PRODUCTS_GRID_CONTAINER">
              {response
                ? response?.nodes?.map((product: any) => (

                  <ProductItem
                    key={product.id}
                    product={product}
                  />

                ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>



      {/* //  */}
      <article className='flex lg:flex-row flex-col justify-between w-full gap-5 gap-y-7 md:p-10 p-5 bg-zinc-200 rounded-3xl'>

        <SmallHeaderText
          HEAD={<>Top Picks from <b>{collectionTitle}</b></>}
          SUBHEAD={<>Explore our curated selection of top picks from the <b>{collectionTitle}</b> collection.</>}
        />


        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={products}>
            {(response) => (
              <div className="flex flex-row gap-5 overflow-x-scroll HIDDEN_SCROLL">
                {response
                  ? response?.nodes?.slice(0, 3)?.map((product: any) => (

                    <ProductItem
                      key={product.id}
                      product={product}
                    />

                  ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>
      </article>

    </section>
  );
}

