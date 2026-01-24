import { Await, useLoaderData, Link } from 'react-router';
import type { Route } from './+types/_index';
import { Suspense } from 'react';
import { ProductItem } from '~/components/ProductItem';
import CollectionsHero, { AllCategories, CollectionsNewHero, TwoGrids } from '~/components/MINE/CollectionsHero';
import Reviews from '~/components/MINE/Reviews';

// For the collection section
import { MAINMENU_AND_PRODUCTS_QUERY } from './collections._index';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';
import FAQs from '~/components/MINE/FAQs';
import { SmallHeaderText } from '~/components/MINE/UI/HeaderText';
import { PlatinumBanners, GridBanners, ScrollBanners, CasualBanners } from '~/components/MINE/AdsSections';
import HeroSlider from '~/components/MINE/HeroSlider';
import ArrowButton from '~/components/MINE/ReUsable/Buttons';
import { ConsumerElectronicsBanner, HomeGardenFurnitureBanner, PetsSuppliesBanner } from '~/components/MINE/NewCollectionsBanners';





// Set the seo meta tags for the homepage
export const meta: Route.MetaFunction = () => [
  { title: 'HABEBE | Home' },
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

  const MainCollections = MainMenu?.menu?.items?.map((item: any) => item.resource); // Used for Fetching Collections like => Men, Women, Unisex, ...


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


  return (
    <div className='space-y-10'>
      {/* <CollectionsHero
        Collections={MainCollections}
      /> */}

      <HeroSlider
        mainCollections={MainCollections}
      />


      <AllCategories
        allSubMenus={MainCollections.slice(2)}
      />


      {/* <Collections /> */}
      {MainCollections.map((collection: any) => (
        <div key={collection.id} className="mb-10">
          <MainCollectionsProductsSample
            mainBanners={collection?.mainBanners?.references?.nodes} // Get the matafield called "main_banners" that has the banners for each collection (if we assigned it to it)
            scrollBanners={collection?.scrollBanners?.references?.nodes}
            gridBanners={collection?.gridBanners?.references?.nodes}
            platinumBanners={collection?.platinumBanners?.references?.nodes} //
            casualBanners={collection?.casualBanners?.references?.nodes}
            products={collection?.products} // 
            collectionTitle={collection?.title}
            Handle={collection?.handle}


          />
        </div>
      ))}

      <FAQs />
      <Reviews />
    </div>
  );
}


// MainCollectionsProductsSample component
export function MainCollectionsProductsSample({ products, collectionTitle, Handle, mainBanners, scrollBanners, gridBanners, platinumBanners, casualBanners }: { products: any; collectionTitle: string; Handle: string; mainBanners?: any; scrollBanners?: any; gridBanners?: any; platinumBanners: any, casualBanners?: any; }) {


  return (
    <section className="flex flex-col gap-10 pb-10">

      {/* /// ADS Section for MainBanners */}
      {/* <ScrollBanners bannerArray={scrollBanners} Title={collectionTitle} collectionHandle={Handle} />
      <GridBanners collectionHandle={Handle} bannerArray={gridBanners} />
      <PlatinumBanners bannerArray={platinumBanners} collectionHandle={Handle} />
      <CasualBanners bannerArray={casualBanners} collectionHandle={Handle} />
 */}


      {Handle === "pets-supplies" &&
        <PetsSuppliesBanner />
      }
      {Handle === "home-garden-furniture" &&
        <HomeGardenFurnitureBanner />
      }
      {Handle === "consumer-electronics" &&
        <ConsumerElectronicsBanner />
      }

      {Handle === "men-clothing" &&
        <PlatinumBanners collectionHandle='men-clothing' />
      }



      {/*  /// Header text */}
      {/* <div className='flex flex-row justify-between items-start'>
        <SmallHeaderText HEAD={`${collectionTitle}${collectionTitle?.endsWith('s') ? "'" : "'s"} Collection`} />

        <Link
          className='LINK'
          prefetch="intent"
          to={`/collections/${Handle}`}
        >
          See More
        </Link>
      </div> */}


      {/* /   */}
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={products}>
          {(response) => (
            <div className="PRODUCTS_GRID_CONTAINER">
              {response
                ? response?.nodes?.map((product: any) => (

                  <ProductItem
                    key={product?.id}
                    product={product}
                  />

                ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

