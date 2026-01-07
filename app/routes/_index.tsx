import { Await, useLoaderData, Link } from 'react-router';
import type { Route } from './+types/_index';
import { Suspense } from 'react';
import { ProductItem } from '~/components/ProductItem';
import HeroSection, { AllCategories, TwoGrids } from '~/components/MINE/HeroSection';
import Reviews from '~/components/MINE/Reviews';

// For the collection section
import { getPaginationVariables } from '@shopify/hydrogen';
import Collections, { MAINMENU_AND_PRODUCTS_QUERY } from './collections._index';
import LoadingSpinner from '~/components/MINE/ReUsable/LoadingSpinner';
import Logos from '~/components/MINE/Logos';
import FAQs from '~/components/MINE/FAQs';





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

  console.log(`%c${JSON.stringify(MainCollections)}`, 'color: red; font-size: 20px;')


  return (
    <div className='space-y-10'>
      <HeroSection
        Collections={MainCollections}
      />

      {/* Render the CollectionsSection component, passing the collections data */}

      <TwoGrids
        subTwoMenus={MainCollections.slice(0, 2)}
      />

      <AllCategories
        allMenus={MainCollections.slice(2)}
      />
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


      {/* <Link
        to="https://wa.me/+971561576657?text=I'm%20interested%20in%20your%20ad%20on%20Hydrogen"
        className='w-full lg:h-80 h-30 border border-zinc-100 bg-zinc-50 lg:rounded-3xl rounded-2xl flex items-center justify-center LINK'
        target='_blank'
        rel="noreferrer"
      >
        your ad here
      </Link> */}


      <FAQs />



      <Reviews />
    </div>
  );
}



export function MainCollectionsProductsSample({ products, collectionTitle, Handle }: { products: any; collectionTitle: string; Handle: string; }) {



  return (
    <div className="border-b border-black/10 pb-10">


      <div className='flex flex-row justify-between items-start mb-5 px-[3%]'>
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

    </div>
  );
}
