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
      const discountAmount = price * (discountPercent / 100);
      totalDiscountOnAllProducts += discountAmount;
    }
  });



  return (
    <div
      aria-labelledby="cart-summary" className="w-full"
    >
      <h3 className='lg:text-3xl text-2xl font-bold'>Order Summary</h3>

      <dl className="flex flex-row justify-between">
        <dt className='text-zinc-300'>Subtotal</dt>
        <dd className=' font-bold'>
          {cart?.cost?.subtotalAmount?.currencyCode} {Number(cart?.cost?.subtotalAmount?.amount) + Number(totalDiscountOnAllProducts)}
        </dd>
      </dl>

      <dl className="flex flex-row justify-between">
        <dt className='text-zinc-300'>Discounts</dt>
        <dd className='text-red-500 font-bold'>
          - {cart?.cost?.totalAmount?.currencyCode} {totalDiscountOnAllProducts}
        </dd>
      </dl>

      <dl className="flex flex-row justify-between">
        <dt className='text-zinc-300'>Delivery fee</dt>
        <dd className='text-green-700'>Free</dd>
      </dl>


      <dl className="text-2xl flex flex-row justify-between border-t border-zinc-300 py-3">
        <dt className='text-zinc-300'>Total</dt>
        <dd className='font-bold'>
          {cart?.cost?.totalAmount?.currencyCode} {cart?.cost?.totalAmount?.amount}
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
    <a href={checkoutUrl} target="_self" className=''>
      <button className='BUTTON1 min-w-full'>Checkout <CircleChevronRight size={25} /> </button>
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

    if (code.trim().length < 3) return; // ignore if too short

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


      <form onSubmit={handleApply} className='flex flex-row w-full gap-3'>
        <input
          className={`w-full px-5 py-1 rounded-full bg-zinc-100 transition-all ${shake ? 'animate-pulse border-2 border-red-500' : ''
            }`}
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError('');
          }}
          placeholder="Discount code"
        />


        <button className="BUTTON1" type="submit">
          Apply
        </button>
      </form>

      {error && <p className="z-1 text-red-500 text-sm px-3">{error}</p>}
    </div>
  );
}
