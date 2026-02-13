import { Await, useLoaderData } from 'react-router';
import type { Route } from './+types/($locale)_index';
import { Suspense, useMemo, } from 'react';
import { ProductItem } from '~/components/ProductItem';
import Reviews from '~/components/MINE/Reviews';

// For the collection section
import { MAINMENU_AND_PRODUCTS_QUERY } from './($locale).collections._index';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';
import FAQs from '~/components/MINE/FAQs';
import HeaderText, { SmallHeaderText } from '~/components/MINE/UI/HeaderText';
import { OverflowBanners } from '~/components/MINE/AdsSections';
import HeroSlider from '~/components/MINE/HeroSlider';
import ArrowButton from '~/components/MINE/ReUsable/Buttons';
import { ElectronicsBanner, HomeGardenFurnitureBanner, PetsBanner } from '~/components/MINE/NewCollectionsBanners';
import CategoryBanner from '~/components/MINE/CategoryBanner';





// Set the seo meta tags for the homepage
export const meta: Route.MetaFunction = () => [
  { title: 'HABEBE | Home' },
  { name: 'description', content: 'Welcome to our awesome shop — discover featured collections and great products!' },
];



// Handle HTTP caching for the homepage
export async function loader(args: Route.LoaderArgs) {
  // Get language/country from the context (set in server.ts)
  const { language, country } = args.context.storefront.i18n;

  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args, language, country);

  return { ...deferredData, ...criticalData };
}



async function loadCriticalData({ context }: Route.LoaderArgs, language: any, country: any) {

  const [MainMenu] = await Promise.all([
    context.storefront.query(MAINMENU_AND_PRODUCTS_QUERY, {
      variables: {
        handle: 'main-menu',
        language, // Pass language to the query
        country,  // Pass country to the query
      }
    }),
  ]);

  // const TopLevelCollections = MainMenu?.menu?.items;
  const TopSubLevelCollections = MainMenu?.menu?.items || [];

  return { TopSubLevelCollections };
}


// Load data for rendering content below the fold.
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}



// The homepage component
export default function Homepage() {

  const { TopSubLevelCollections } = useLoaderData<typeof loader>();


  return (
    <div className='space-y-10'>
      <HeroSlider
        mainCollections={TopSubLevelCollections.map((item: any) => item.resource) ?? []}
      />

      <OverflowBanners />

      {TopSubLevelCollections?.map((mainMenu: any) => {
        if (!mainMenu.resource) return null;

        // 1. Extract all products from every sub-item (Shirts, Pants, etc.)
        const allProducts = mainMenu.items?.flatMap(
          (subItem: any) => subItem.resource?.products?.nodes || []
        );

        // 2. Remove duplicates (if a product is in two sub-collections)
        const uniqueProducts = {
          nodes: Array.from(new Map(allProducts.map((p: { id: any; }) => [p.id, p])).values())
        };

        const uniqueSubCollections = Array.from(
          new Map(
            mainMenu.items?.map((subItem: any) => [
              subItem.resource.id,
              { handle: subItem.resource.handle, image: subItem.resource.image, title: subItem.resource.title }
            ])
          ).values()
        );


        console.log(`%c${JSON.stringify(uniqueSubCollections, null, 2)}`, 'color: blue; font-size: 20px;')
        return (
          <div key={mainMenu.resource.id} className="main-menu-section mb-12">
            {/* Display Main Title (e.g., Men) */}
            {/* <h2>{mainMenu.resource.title}</h2> */}

            {/* Display the merged product list */}
            <TopLevelCollectionsProductsSample
              products={uniqueProducts}
              collectionTitle={mainMenu.resource.title}
              Handle={mainMenu.resource.handle}
              BannerArray={uniqueSubCollections}
            />
          </div>
        );
      })}

      <FAQs />
      <Reviews />
    </div>
  );
}


// TopLevelCollectionsProductsSample component
export function TopLevelCollectionsProductsSample({ BannerArray, products, collectionTitle, Handle, mainBanners, scrollBanners, gridBanners, platinumBanners, casualBanners }: { BannerArray?: any; products: any; collectionTitle: string; Handle: string; mainBanners?: any; scrollBanners?: any; gridBanners?: any; platinumBanners?: any, casualBanners?: any; }) {


  const arrayOfPromotions = [
    "Up to 10% off",
    "Hot deals",
    "Save up to 15%",
    "Exclusive offers",
    "Up to 20% discount",
    "Best deals for",
    "Limited-time offers",
    "Grab up to 25% off",
    "Special prices",
    "Amazing savings"
  ];


  const randomPromotion = useMemo(() => arrayOfPromotions[Math.floor(Math.random() * arrayOfPromotions.length)], [])



  type BannerProps = {
    bannerArray: any;   // ← optional so old banners don't break
  };
  const BannerMap: Record<string, (props: BannerProps) => JSX.Element | null> = {
    pets: (props) => <PetsBanner {...props} />,
    home: (props) => <HomeGardenFurnitureBanner />,        // ignores bannerArray for now
    electronics: (props) => <ElectronicsBanner {...props} />,
    men: (props) => <CategoryBanner />, // CategoryBanner doesn't accept banner props
  };

  // 2. Render dynamically
  const SelectedBanner = BannerMap[Handle];

  if (!SelectedBanner) return null;


  return (
    <section className="flex flex-col gap-10">

      {/* /// ADS Section for MainBanners */}
      {/* <ScrollBanners bannerArray={scrollBanners} Title={collectionTitle} collectionHandle={Handle} />
      <GridBanners collectionHandle={Handle} bannerArray={gridBanners} />
      <PlatinumBanners bannerArray={platinumBanners} collectionHandle={Handle} />
      <CasualBanners bannerArray={casualBanners} collectionHandle={Handle} />
      */}
      {/* <ScrollBanners bannerArray={scrollBanners} Title={collectionTitle} collectionHandle={Handle} /> */}


      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-10 justify-between items-center text-black">
          <SmallHeaderText HEAD={`${randomPromotion}`} />
          <ArrowButton
            Text="Explore"
            CC="border h-fit"
            Href={`/collections/${Handle}`}
          />
        </div>

        <SelectedBanner bannerArray={BannerArray} />
      </div>


      {/* /   */}
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={products}>
          {(response) => (
            <div className=''>
              <div className="PRODUCTS_GRID_CONTAINER">
                {response
                  ? [...(response?.nodes || [])]
                    .sort(() => Math.random() - 0.5)
                    .map((product: any) => (
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
      ">
        {/* Optional subtle overlay pattern / shine */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none" />

        BANNER PLACEHOLDER YA ALI
      </h2>
    </section>
  );
}
