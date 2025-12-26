import { Suspense } from 'react';
import { Await, Link, NavLink, useAsyncValue } from 'react-router';
import {
  type CartViewPayload,
  Image,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { Codepen, Menu, SearchIcon, ShoppingBag, User } from "lucide-react";



interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({ header, isLoggedIn, cart, publicStoreDomain, }: HeaderProps) {


  const { menu } = header;
  console.log(`%c${JSON.stringify(header)}`, 'color: pink; font-size: 20px;')

  return (
    <header className="w-full flex flex-row items-center gap-5 px-[5%] py-5">
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
          width={40}
          height={40}
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



export function HeaderMenu({ menu, primaryDomainUrl, viewport, publicStoreDomain, }: { menu: HeaderProps['header']['menu']; primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url']; viewport: Viewport; publicStoreDomain: HeaderProps['publicStoreDomain']; }) {



  // const className = `header-menu-${viewport}`;
  // const { close } = useAside();



  return (
    <nav role="navigation" className='flex md:flex-row flex-col gap-3'>


      {/* // // Mobile */}
      {viewport === 'mobile' && (
        menu?.items.map((item) => {
          if (!item.url) return null;
          return (
            <a
              href={item.url}
              key={item.id}
              rel="noopener noreferrer"
              target="_blank"
              className="px-3 py-2 w-fit rounded-full hover:bg-black hover:text-white duration-300"
            >
              {item.title}
            </a>
          );
        })
      )}


      {/* // // Desktop */}
      {menu?.items.map((item) => {
        if (!item.url) return null;


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
            target="_blank"
            className={`hidden md:flex px-3 py-2 rounded-full hover:bg-black hover:text-white duration-300 ${item?.url?.split('/')?.pop()?.includes(item.title.toLowerCase()) ? 'bg-zinc-100 text-black' : 'bg-black text-white'}`}
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
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : <User />)}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}



function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="block md:hidden bg-black text-white p-2 rounded-xl cursor-pointer hover:opacity-70 duration-300"
      onClick={() => open('mobile')}
    >
      <Menu />
    </button>
  );
}



function SearchToggle() {
  const { open } = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      <SearchIcon />
    </button>
  );
}




function CartBadge({ count }: { count: number | null }) {


  // const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();


  return (
    <Link
      className='relative flex flex-row items-center gap-2'
      to="/cart"
    // onClick={(e) => {
    //   e.preventDefault();
    //   open('cart');

    //   publish('cart_viewed', {
    //     cart,
    //     prevCart,
    //     shop,
    //     url: window.location.href || '',
    //   } as CartViewPayload);
    // }}
    >
      <ShoppingBag />
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

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

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
