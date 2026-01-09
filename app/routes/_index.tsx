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
            products={collection.products}
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
export function MainCollectionsProductsSample({ products, collectionTitle, Handle }: { products: any; collectionTitle: string; Handle: string; }) {



  return (
    <section className="flex flex-col gap-5  pb-10">


      <div className='flex flex-row justify-between items-start px-[3%]'>
        <h3 className='text-start w-full md:text-3xl text-2xl capitalize'>
          {collectionTitle}&apos;s Collection
        </h3>


        <Link
          className='LINK'
          prefetch="intent"
          to={`/collections/${Handle}`}
        >
          See More
        </Link>
      </div>


      {/* //  */}
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
      <article className='flex lg:flex-row flex-col gap-5 gap-y-7 md:p-10 p-5 bg-zinc-200 border border-black/10 rounded-3xl'>


        <SmallHeaderText
          HEAD={<>Top Picks from <b>{collectionTitle}</b></>}
          SUBHEAD={<>Explore our curated selection of top picks from the <b>{collectionTitle}</b> collection.</>}
        />


        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={products}>
            {(response) => (
              <div className="w-full grid sm:grid-cols-3 grid-cols-2 gap-5 overflow-scroll HIDDEN_SCROLL ">
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
