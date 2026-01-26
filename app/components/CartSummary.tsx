import type { CartApiQueryFragment } from 'storefrontapi.generated';
import type { CartLayout } from '~/components/CartMain';
import { type OptimisticCart } from '@shopify/hydrogen';
import { useEffect, useRef, useState } from 'react';
import { CircleChevronRight } from 'lucide-react';



type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};


export function CartSummary({ cart, layout }: CartSummaryProps) {



  // Logic to calculate total fake discount on all products
  let totalDiscountOnAllProducts = 0;

  cart?.lines?.nodes.forEach((line) => {
    const price = Number(line.cost.totalAmount.amount);

    let discountPercent = 0; // Initialize discount percentage

    // Apply discount based on price ranges
    if (price >= 500) discountPercent = 7;
    else if (price >= 100) discountPercent = 10;

    // Calculate and accumulate discount amount
    if (discountPercent > 0) {
      const discountAmount = Math.round(price * discountPercent) / 100;
      totalDiscountOnAllProducts += discountAmount;
    }
  });



  return (
    <div
      aria-labelledby="cart-summary" className="w-full"
    >
      <h4 className='font-medium'>Order Summary</h4>

      <div className='flex flex-col gap-1 py-3'>
        <dl className="flex flex-row justify-between">
          <dt className='text-zinc-300'><p>Subtotal</p></dt>
          <dd className=' font-medium'>
            <p> {cart?.cost?.subtotalAmount?.currencyCode} {Number(cart?.cost?.subtotalAmount?.amount) + Number(totalDiscountOnAllProducts)}</p>
          </dd>
        </dl>

        <dl className="flex flex-row justify-between">
          <dt className='text-zinc-300'><p>Discounts</p></dt>
          <dd className='text-red-500 font-medium'>
            <p>- {cart?.cost?.totalAmount?.currencyCode} {totalDiscountOnAllProducts.toFixed(2)}</p>
          </dd>
        </dl>

        <dl className="flex flex-row justify-between">
          <dt className='text-zinc-300'><p>Delivery fee</p></dt>
          <dd className='text-green-700'><p>Free</p></dd>
        </dl>
      </div>



      <dl className="flex flex-row justify-between border-t border-zinc-300 py-3">
        <dt className='text-zinc-300'><h4>Total</h4></dt>
        <dd className='font-medium'>
          <h4>{cart?.cost?.totalAmount?.currencyCode} {cart?.cost?.totalAmount?.amount}</h4>
        </dd>
      </dl>


      <div className='flex flex-col gap-3 mt-5'>
        <CartDiscounts />
        <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
      </div>
    </div>
  );
}




function CartCheckoutActions({ checkoutUrl }: { checkoutUrl?: string }) {
  if (!checkoutUrl) return null;

  return (
    <a href={checkoutUrl} target="_self" className='w-full flex items-center justify-center'>
      <button className='BUTTON1 w-full'>Checkout</button>
    </a>
  );
}



//// DISCOUNTS COMPONENT 
function CartDiscounts() {

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);



  // Handle applying a discount code
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    // Fake invalid code
    setError('This discount code is not applicable.');
    setShake(true);


    setTimeout(() => {
      setError(''); // Clear error message
      setShake(false); // Reset shake state after animation
      setCode(''); // Clear input after showing error
    }, 3000);
  };

  return (
    <div className="relative flex flex-col gap-3 w-full">


      <form onSubmit={handleApply} className='w-full '>
        <div className='flex flex-row gap-3'>
          <input
            className={`INPUT ${shake ? 'animate-pulse border-2 border-red-500' : ''
              }`}
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
            }}
            placeholder="Discount code"
          />



          <button onClick={handleApply} className="BUTTON1 w-fit" type="submit">
            Apply
          </button>
        </div>
      </form>

      {error && <span className="z-1 text-red-500 text-sm px-3">{error}</span>}
    </div>
  );
}
