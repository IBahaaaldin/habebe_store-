import { Suspense, useId } from 'react';
import { Await, Link, NavLink, useAsyncValue, useLocation } from 'react-router';
import {
  Image,
  useAnalytics,
  useOptimisticCart,
  type CartViewPayload,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { Menu, SearchIcon, ShoppingBag, User } from "lucide-react";
import { SearchFormPredictive } from './SearchFormPredictive';
import LoadingSpinner from './MINE/ReUsable/LoadingSpinner';
import { SearchResultsPredictive } from './SearchResultsPredictive';



interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
}



// This is the main header component for the entire app
export default function Header({ header, isLoggedIn, cart }: HeaderProps) {

  const { menu } = header;

  return (
    <header className={`z-999 sticky top-0 left-0 right-0 bg-white backdrop-blur-sm w-full mx-auto flex flex-row items-center gap-5 px-[2.5%] py-3.5 duration-500 
      `}
    >
      {/* LOGO on TOP */}
      <NavLink
        prefetch="intent"
        to="/"
        end
      >
        <Image
          alt={header.shop.name}
          src={header.shop.brand?.logo?.image?.url}
          width={30}
          height={30}
          className='scale-120'
        />
      </NavLink>

      <HeaderMenu
        menu={menu}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}


/// Header Menu Component inside the Header
export function HeaderMenu({ menu }: { menu: any }) {


  const location = useLocation();
  const currentTabURL = location.pathname.split('/').pop(); // Get the first segment of the path


  return (
    <nav role="navigation" className='flex lg:flex-row flex-col gap-3'>

      <ul className="hidden lg:flex flex-row rounded-full"> {/* Increased gap for better look */}
        {menu?.items.slice(0, 5).map((menu: any) => { // Slice only the first 5 menus
          // Optional: Logic to determine if active

          const isMainMenuActive = currentTabURL === menu.resource?.handle;

          return (
            <li
              key={menu.id}
              className={`relative group px-3 py-1 rounded-full`}
            >

              {/* The Active Line */}
              {isMainMenuActive && (
                <div className="absolute left-0 right-0 top-10 h-0.5 bg-orange-400 mx-3 duration-300" />
              )}

              <Link
                to={`/collections/${menu?.resource?.handle || '#'}`}
                key={menu.id}

                className={`hover:text-orange-400 text-nowrap text-black text-start duration-500 
                  ${isMainMenuActive ? 'text-orange-400' : 'text-black'}
                  `}
              >
                <span>
                  {menu.title}
                </span>
              </Link>


              {/* Dropdown Container */}
              {menu.items && menu.items.length > 0 && (
                <ul className={`
                  absolute left-0 top-5 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300
                `}>
                  <div className='mt-5 border-5 border-zinc-50 rounded-2xl p-1 min-w-sm overflow-scroll HIDDEN_SCROLL bg-white flex flex-col gap-1 max-h-[70vh]'>
                    {menu.items.map((subMenu: any) => {
                      const isSubMenuActive = currentTabURL === subMenu.resource?.handle;

                      return (
                        <Link
                          to={`/collections/${subMenu?.resource?.handle || '#'}`}
                          key={menu.id}

                          className={`px-3 py-0.5 w-fit rounded-xl hover:text-orange-400 hover:bg-orange-100 text-black text-start duration-500
                          ${isSubMenuActive ? 'text-orange-400' : 'text-black'}
                          `}
                        >
                          <span>
                            {subMenu.title}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </ul>
              )}
            </li>
          );
        })}

        {menu.items.length > 5 ? "..." : ""}
      </ul>
    </nav>
  );
}



function HeaderCtas({ isLoggedIn, cart, }: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {

  return (
    <nav className="header-ctas" role="navigation">
      {/* Mobile Menu */}
      <HeaderMenuMobileToggle />
      {/* Search functionality */}
      <SearchToggle />
      <SamePageSearch />

      {/* Cart icon and count */}
      <CartToggle cart={cart} />
      {/* Account link, showing 'Account' if logged in, otherwise a User icon */}
      <NavLink prefetch="intent" to="/account">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : <User size={20} className='text-black hover:text-orange-400 duration-300 cursor-pointer' />)}
          </Await>
        </Suspense>
      </NavLink>
    </nav>
  );
}



function HeaderMenuMobileToggle() {

  const { open } = useAside();
  return (
    <button
      className="block lg:hidden bg-orange-400 text-black p-1 rounded-lg cursor-pointer hover:opacity-70 duration-300"
      onClick={() => open('mobile')}
    >
      <Menu className='text-white ' size={20} />
    </button>
  );
}




function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}


function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);

  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}



function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside();
  {/* [START cartview] */ }
  const { publish, shop, cart, prevCart } = useAnalytics();
  {/* [END cartview] */ }

  return (
    <Link
      className='relative '
      to="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        {/* [START cartview] */ }
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
        {/* [END cartview] */ }
      }}
    >
      <ShoppingBag size={20} className='text-black hover:text-orange-400 duration-300 cursor-pointer' />
      {count !== null && <span className='absolute z-1 -top-3 left-3 w-5 h-5 flex items-center justify-center bg-orange-400 text-white rounded-full'>{count}</span>}
    </Link>
  );
}





/// Search Toggle Button
function SearchToggle() {

  const { open } = useAside();
  return (
    <button className="sm:hidden flex" onClick={() => open('search')}>
      <SearchIcon className='text-black hover:text-orange-400 duration-300 cursor-pointer' />
    </button>
  );
}



/// Display the search results in the same page
function SamePageSearch() {
  const queriesDatalistId = useId();

  return (
    <div className='hidden sm:flex'>
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
          </div>
        )}
      </SearchFormPredictive>


      <SearchResultsPredictive>
        {({ items, total, term, state, closeSearch }) => {
          const { products } = items;

          if (state === 'loading' && term.current) {
            return <div className='SEARCH_CONTAINERS'><LoadingSpinner /></div>;
          }

          if (!term.current) {
            return null
          }

          if (!total) {
            return <div className='SEARCH_CONTAINERS'>
              <SearchResultsPredictive.Empty term={term} />
            </div>;
          }

          return (
            <div className='SEARCH_CONTAINERS'>
              <SearchResultsPredictive.Products
                products={products}
                closeSearch={closeSearch}
                term={term}
              />
            </div>
          );
        }}
      </SearchResultsPredictive>
    </div>
  )
}