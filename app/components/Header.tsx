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
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';




// This is the main header component for the entire app
export function Header({ header, isLoggedIn, cart, publicStoreDomain, }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);



  // Used to descale the header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { menu } = header;


  return (
    <header className={`z-999 fixed left-0 right-0 backdrop-blur-sm rounded-full max-w-[95%] mx-auto flex flex-row items-center gap-5 px-5 p-3 duration-500
      ${isScrolled ? 'scale-70 top-0 bg-white/40' : 'bg-white scale-100 top-5'}
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
        />
      </NavLink>

      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}



// Header Menu Component inside the Header
export function HeaderMenu({ menu, primaryDomainUrl, viewport, publicStoreDomain }: { menu: HeaderProps['header']['menu']; primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url']; viewport: Viewport; publicStoreDomain: HeaderProps['publicStoreDomain']; }) {


  const location = useLocation();
  const currentPathname = location.pathname;


  return (
    <nav role="navigation" className='flex lg:flex-row flex-col gap-3'>


      {/* // // Mobile */}
      {viewport === 'mobile' && (
        menu?.items.map((item) => {
          if (!item.url) return null;

          const isActive = currentPathname === new URL(item.url).pathname;

          return (
            <a
              href={item.url}
              key={item.id}
              rel="noopener noreferrer"
              className={`flex px-3 py-2 rounded-full hover:opacity-50 font-bold duration-300 ${isActive ? 'bg-white text-orange-500' : 'text-black'}`}
            >
              {item.title}
            </a>
          );
        })
      )}



      {/* // // Desktop */}
      {menu?.items.map((item) => {
        if (!item.url) return null;

        const isActive = currentPathname === new URL(item.url).pathname;


        // // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            className={`hidden lg:flex px-3 py-2 rounded-full hover:opacity-50 font-bold duration-300 ${isActive ? 'bg-white text-orange-500' : 'text-black'}`}

          >
            {item.title}
          </a>
        );
      })}
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
            {(isLoggedIn) => (isLoggedIn ? 'Account' : <User className='text-black' />)}
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
      className="block lg:hidden bg-orange-500 text-black p-2 rounded-xl cursor-pointer hover:opacity-70 duration-300"
      onClick={() => open('mobile')}
    >
      <Menu className='text-white' />
    </button>
  );
}



function SearchToggle() {

  const { open } = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      <SearchIcon className='text-black' />
    </button>
  );
}




function CartBadge({ count }: { count: number | null }) {

  return (
    <Link
      className='relative flex flex-row items-center gap-2'
      to="/cart"
    >
      <ShoppingBag className='text-black' />
      {count !== null && <span className='absolute -top-3 left-3 text-xs w-6 h-6 flex items-center justify-center bg-zinc-100 rounded-full'>{count}</span>}
    </Link>
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
