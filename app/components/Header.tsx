import { Suspense, useEffect, useState } from 'react';
import { Await, Link, NavLink, useAsyncValue, useLocation } from 'react-router';
import {
  Image,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { Menu, SearchIcon, ShoppingBag, User } from "lucide-react";




interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
}



// This is the main header component for the entire app
export default function Header({ header, isLoggedIn, cart }: HeaderProps) {

  const { menu } = header;


  return (
    <header className={`z-999 sticky top-5 left-0 right-0 bg-white border border-black/5 backdrop-blur-sm rounded-full w-full mx-auto flex flex-row items-center gap-5 px-5 p-3 duration-500
      `}
    >
      <NavLink
        prefetch="intent"
        to="/"
        style={activeLinkStyle}
        end
      >
        {/* LOGO on TOP */}
        <Image
          alt={header.shop.name}
          src={header.shop.brand?.logo?.image?.url}
          width={30}
          height={30}
          className='scale-130'
        />
      </NavLink>


      <HeaderMenu
        menu={menu}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}



// Header Menu Component inside the Header
export function HeaderMenu({ menu }: { menu: any }) {


  const location = useLocation();
  const currentTabURL = location.pathname.split('/').pop(); // Get the first segment of the path



  return (
    <nav role="navigation" className='flex lg:flex-row flex-col gap-3'>




      <ul className="hidden lg:flex flex-row gap-6"> {/* Increased gap for better look */}
        {menu?.items.map((menu: any) => {
          // Optional: Logic to determine if active

          const isMainMenuActive = currentTabURL === menu.resource?.handle;

          return (
            <li
              key={menu.id}
              className="relative group"
            >
              <Link
                to={`/collections/${menu?.resource?.handle || '#'}`}
                key={menu.id}

                className={`hover:text-orange-400 text-black font-bold text-start duration-500 
                  ${isMainMenuActive ? 'text-orange-400' : 'text-black'}
                  `}
              >
                {menu.title}
              </Link>

              {/* Dropdown Container */}
              {menu.items && menu.items.length > 0 && (
                <ul className="absolute left-0 top-5 hidden group-hover:block ">
                  <div className='mt-7 rounded-2xl p-1 min-w-sm overflow-scroll HIDDEN_SCROLL bg-white border border-zinc-300 flex flex-col gap-1 max-h-[70vh]'>
                    {menu.items.map((subMenu: any) => {
                      const isSubMenuActive = currentTabURL === subMenu.resource?.handle;

                      return (
                        <Link
                          to={`/collections/${subMenu?.resource?.handle || '#'}`}
                          key={menu.id}

                          className={`px-3 py-1 w-fit rounded-xl hover:text-orange-400 hover:bg-orange-100 text-black font-bold text-start duration-500
                          ${isSubMenuActive ? 'text-orange-400' : 'text-black'}
                          `}
                        >
                          {subMenu.title}
                        </Link>
                      )
                    })}
                  </div>
                </ul>
              )}
            </li>
          );
        })}
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
      {/* Cart icon and count */}
      <CartToggle cart={cart} />
      {/* Account link, showing 'Account' if logged in, otherwise a User icon */}
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : <User className='text-black hover:text-orange-400 duration-300 cursor-pointer' />)}
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
      className="block lg:hidden bg-orange-400 text-black p-2 rounded-xl cursor-pointer hover:opacity-70 duration-300"
      onClick={() => open('mobile')}
    >
      <Menu className='text-white ' size={15} />
    </button>
  );
}



/// Search Toggle Button
function SearchToggle() {

  const { open } = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      <SearchIcon className='text-black hover:text-orange-400 duration-300 cursor-pointer' />
    </button>
  );
}



/// Cart Badge showing number of items in cart
function CartBadge({ count }: { count: number | null }) {

  return (
    <Link
      className='relative flex flex-row items-center gap-2'
      to="/cart"
    >
      <ShoppingBag className='text-black hover:text-orange-400 duration-300 cursor-pointer' />
      {count !== null && <span className='absolute -top-3 left-3 text-xs w-6 h-6 flex items-center justify-center bg-orange-400 text-white rounded-full'>{count}</span>}
    </Link>
  );
}


/// Cart Toggle Button with Suspense
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



function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
