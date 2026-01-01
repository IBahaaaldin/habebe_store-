import { Await, Link } from 'react-router';
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




function CartAside({ cart }: { cart: PageLayoutProps['cart'] }) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}



// Search Aside component for predictive search
function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="flex flex-col gap-5">
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

              <button className='BUTTON1' onClick={goToSearch}>Search</button>
            </div>
          )}
        </SearchFormPredictive>



        {/* The search results */}
        <SearchResultsPredictive>
          {({ items, total, term, state, closeSearch }) => {
            const { articles, collections, pages, products, queries } = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
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
                    className='LINK'
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
