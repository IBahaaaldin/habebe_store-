import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from 'react-router';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { CartSummary } from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};



export function CartMain({ layout, cart: originalCart }: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;



  // console.log(`%c${JSON.stringify(cart.)}`, 'color: red; font-size: 20px;')

  return (
    <div>
      {/* Show an empty cart message */}
      <CartEmpty hidden={linesCount} layout={layout} />


      {/* Show the cart lines */}
      <div className="relative flex xl:flex-row flex-col gap-10 ">
        <ul className='flex flex-col gap-3 lg:min-w-2xl '>
          {(cart?.lines?.nodes ?? []).map((line) => (
            <CartLineItem key={line.id} line={line} layout={layout} />
          ))}
        </ul>


        {/* Right Side */}
        <div className='w-full'>
          {cartHasItems && <CartSummary cart={cart} layout={layout} />}
        </div>
      </div>
    </div>
  );
}



function CartEmpty({ hidden = false, }: { hidden: boolean; layout?: CartMainProps['layout']; }) {

  const { close } = useAside();


  return (
    <div hidden={hidden} className='min-h-[50vh] flex flex-col items-center justify-center'>
      <h5 className='text-center font-medium w-full'>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </h5>
      <br />
      <Link to="/collections" onClick={close} prefetch="viewport" className='BUTTON2'>
        Continue shopping →
      </Link>
    </div>
  );
}
