import { Await, Link, useLocation } from 'react-router';
import { Suspense, useId } from 'react';
import type {
  CartApiQueryFragment,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Aside } from '~/components/Aside';
import { CartMain } from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import { SearchResultsPredictive } from '~/components/SearchResultsPredictive';
import FooterSection from './MINE/ReUsable/FooterSection';
import Logos from './MINE/Logos';
import Header from './Header';
import LoadingSpinner from './MINE/ReUsable/LoadingSpinner';



interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}



// This is the main layout for the entire app
export function PageLayout({ cart, children = null, header, isLoggedIn }: PageLayoutProps) {


  return (
    <Aside.Provider>
      {/* This is the cart, search, and mobile menu */}
      <CartAside cart={cart} />
      <SearchAside />
      <MenuAside menu={header.menu} />


      {/* <Logos /> */}
      <div className='MAIN_COL_CONTAINER'>
        {header && (
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
          />
        )}
        <main>{children}</main>
      </div>


      {/* Footer for the entire app and all PAGES */}
      <Logos />
      <FooterSection
        header={header}
      />
    </Aside.Provider>
  );
}




/// SIDEBAR menu "Will appear only when the user clicks the menu icon"
function MenuAside({ menu }: any) {


  const location = useLocation();
  const currentTabURL = location.pathname.split('/').pop(); // Get the first segment of the path


  return (
    <Aside type="mobile" heading="MENU">
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={null}>
          <ul className='flex flex-col gap-3'>
            {menu?.items.map((item: any, index: number) => {

              const isMainMenuActive = currentTabURL === item.resource?.handle;

              return (
                <li
                  key={index}
                  className="relative group"
                >
                  <Link
                    to={`/collections/${item.resource?.handle || '#'}`}
                    key={item.id}

                    className={`hover:text-orange-400 text-black font-medium text-start duration-500 
                  ${isMainMenuActive ? 'text-orange-400' : 'text-black'}
                  `}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })
            }
          </ul>
        </Await>
      </Suspense>
    </Aside>
  );
}



// Redirect directly to the cart page
function CartAside({ cart }: { cart: PageLayoutProps['cart'] }) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside >
  );
}



// Search Aside component for predictive search
function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="flex flex-col gap-3">
        <SearchFormPredictive>
          {({ fetchResults, goToSearch, inputRef }) => (
            <div className="flex flex-row gap-2">
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                className='INPUT'
                list={queriesDatalistId}
              />

              {/* <button className='BUTTON1' onClick={goToSearch}>Search</button> */}
            </div>
          )}
        </SearchFormPredictive>



        {/* The search results */}
        <SearchResultsPredictive>
          {({ items, total, term, state, closeSearch }) => {
            const { articles, collections, pages, products, queries } = items;

            if (state === 'loading' && term.current) {
              return <LoadingSpinner />;
            }

            if (!term.current) {
              return null
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                {/* <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                /> */}
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                {/* <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                /> */}
                {/* <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                /> */}
                {/* <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                /> */}
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                    className='LINK mt-5'
                  >
                    View all results for <q>{term.current}</q>
                    &nbsp; →
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}
