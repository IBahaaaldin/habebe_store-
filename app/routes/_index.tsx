import { Await, useLoaderData, Link } from 'react-router';
import type { Route } from './+types/_index';
import { Suspense, useMemo, } from 'react';
import { ProductItem } from '~/components/ProductItem';
import CollectionsHero, { AllCategories, CollectionsNewHero, TwoGrids } from '~/components/MINE/CollectionsHero';
import Reviews from '~/components/MINE/Reviews';

// For the collection section
import { MAINMENU_AND_PRODUCTS_QUERY } from './collections._index';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';
import FAQs from '~/components/MINE/FAQs';
import HeaderText, { SmallHeaderText } from '~/components/MINE/UI/HeaderText';
import { PlatinumBanners, GridBanners, ScrollBanners, CasualBanners } from '~/components/MINE/AdsSections';
import HeroSlider from '~/components/MINE/HeroSlider';
import ArrowButton, { SliderButtons } from '~/components/MINE/ReUsable/Buttons';
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
      <HeroSlider
        mainCollections={MainCollections}
      />


      {/* <Collections /> */}
      {MainCollections.map((collection: any) => (
        <div
          key={collection.id}
        >
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



  const arrayOfWords = [
    "Explore",
    "Browse",
    "Uncover",
    "Find",
    "Dive into",
    "Check out",
    "See",
    "View",
    "Experience",
    "Journey through"
  ];


  const arrayOfPromotions = [
    "Up to 10% off",
    "Hot deals on",
    "Save up to 15%",
    "Exclusive offers on",
    "Up to 20% discount",
    "Best deals for",
    "Limited-time offers on",
    "Grab up to 25% off",
    "Special prices on",
    "Amazing savings on"
  ];


  const randomWord = useMemo(() => arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)], [])
  const randomPromotion = useMemo(() => arrayOfPromotions[Math.floor(Math.random() * arrayOfPromotions.length)], [])

  return (
    <section className="flex flex-col gap-5">

      {/* /// ADS Section for MainBanners */}
      {/* <ScrollBanners bannerArray={scrollBanners} Title={collectionTitle} collectionHandle={Handle} />
      <GridBanners collectionHandle={Handle} bannerArray={gridBanners} />
      <PlatinumBanners bannerArray={platinumBanners} collectionHandle={Handle} />
      <CasualBanners bannerArray={casualBanners} collectionHandle={Handle} />
 */}


      {Handle === "pets-supplies" &&
        <div>
          <HeaderText
            HEAD={`${randomWord} our ${collectionTitle}`}
          />
          <PetsSuppliesBanner />
        </div>
      }

      {Handle === "home-garden-furniture" &&
        <div>
          <HeaderText
            HEAD={`${randomWord} our ${collectionTitle}`}
          />
          <HomeGardenFurnitureBanner />
        </div>
      }


      {Handle === "consumer-electronics" &&
        <div>
          <HeaderText
            HEAD={`${randomWord} our ${collectionTitle}`}
          />
          <ConsumerElectronicsBanner />
        </div>
      }


      {Handle === "men-clothing" &&
        <div>
          <HeaderText
            HEAD={`${randomWord} our ${collectionTitle}`}
          />
          <PlatinumBanners collectionHandle='men-clothing' />
        </div>
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
            <div className=''>

              <div className='flex flex-row gap-10 justify-between'>
                <HeaderText
                  HEAD={`${randomPromotion} ${collectionTitle}`}
                />

                <ArrowButton
                  Text={`Explore`}
                  CC='border h-fit'
                  Href={`/collections/${Handle}`}
                />
              </div>
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
            </div>
          )}
        </Await>
      </Suspense>



      <h2 className="
        relative overflow-hidden
        bg-linear-to-r from-red-800 via-red-700 to-red-900
        text-white 
        font-bold text-2xl md:text-4xl lg:text-5xl
        text-center py-12 md:py-16 lg:py-20
        tracking-wide
        shadow-2xl
        border-b-4 border-red-500/50
      ">
        {/* Optional subtle overlay pattern / shine */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none" />

        BANNER PLACEHOLDER YA ALI
      </h2>
    </section>
  );
}
