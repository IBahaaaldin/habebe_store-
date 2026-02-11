import type { CartApiQueryFragment } from 'storefrontapi.generated';
import type { CartLayout } from '~/components/CartMain';
import { type OptimisticCart } from '@shopify/hydrogen';
import { useEffect, useRef, useState } from 'react';
import { CircleChevronRight } from 'lucide-react';
import { Features } from './ProductForm';
import { firstFakeDiscount, price1, price2, secondFakeDiscount } from './MINE/UI/Prices';



type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};


export function CartSummary({ cart, layout }: CartSummaryProps) {



  // Logic to calculate total fake discount on all products
  let totalDiscountOnAllProducts = 0;

  cart?.lines?.nodes.forEach((line) => {
    const price = Number(line.cost.totalAmount.amount);

    let discountPercentage = 0; // Initialize discount percentage

    // Apply discount based on price ranges
    if (price >= price1) discountPercentage = firstFakeDiscount;
    else if (price >= price2) discountPercentage = secondFakeDiscount;
    // Calculate and accumulate discount amount
    if (discountPercentage > 0) {
      const discountAmount = Math.round(price * discountPercentage) / 100;
      totalDiscountOnAllProducts += discountAmount;
    }
  });




  const subTotalPrice = Number(cart?.cost?.subtotalAmount?.amount)
  const totalPrice = Number(cart?.cost?.totalAmount?.amount)
  const totalDiscount = (subTotalPrice - totalPrice)

  const currency = cart?.cost?.totalAmount?.currencyCode ?? 'USD';


  return (
    <div aria-labelledby="cart-summary" className="sticky top-20 w-full">
      <h4 className='font-medium'>Order Summary</h4>

      <div className='flex flex-col gap-1 py-3'>
        <dl className="flex flex-row justify-between">
          <dt className='text-zinc-300'><p>Subtotal</p></dt>
          <dd className=' font-medium'>
            <p> {cart?.cost?.subtotalAmount?.currencyCode} {Number(cart?.cost?.subtotalAmount?.amount ?? 0).toFixed(2) + totalDiscountOnAllProducts.toFixed(2)}</p>
          </dd>
        </dl>


        <dl className="flex flex-row justify-between">
          <dt className='text-zinc-300'><p>Products Discounts</p></dt>
          <dd className='text-red-500 font-medium'>
            <p>- {currency} {totalDiscountOnAllProducts.toFixed(2)}</p>
          </dd>
        </dl>


        {Number(cart?.cost?.subtotalAmount?.amount ?? 0) > 200 &&
          <dl className="flex flex-row justify-between">
            <dt className='text-zinc-300'><p> Discounts on orders above <u>$100</u></p></dt>
            <dd className='text-red-500 font-medium'>
              <p>- {currency} {totalDiscount.toFixed(2)}</p>
            </dd>
          </dl>
        }

        <dl className="flex flex-row justify-between">
          <dt className='text-zinc-300'><p>Delivery fee</p></dt>
          <dd className='text-green-700'><p>Free</p></dd>
        </dl>
      </div>



      <dl className="flex flex-row justify-between border-t border-zinc-300 py-3">
        <dt className='text-zinc-300'><h4 className='text-black'>Total <sup className='text-zinc-400'>price</sup></h4></dt>
        <dd className='font-medium'>
          <h4>{currency} {Number(cart?.cost?.totalAmount?.amount ?? 0).toFixed(2)}</h4>
        </dd>
      </dl>


      <div className='flex flex-col gap-3 mt-5'>
        <CartDiscounts />
        <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
      </div>

      <br />

      <Features />
    </div>
  );
}


// <div className="w-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
//   <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
//     {progress < 100 ? (
//       `Add EGP ${remaining.toFixed(2)} more for Free Delivery`
//     ) : (
//       <h6 className="flex items-center gap-2 text-zinc-700">
//         You&apos;sve unlocked Free Shipping!
//         <PartyPopper size={18} />
//       </h6>
//     )}
//   </div>

//   {/* Progress Bar Container */}
//   {/* Animated Progress Fill */}
//   <div className='w-full h-2 rounded-full bg-zinc-50'>
//     <div
//       className={`h-full rounded-full ${totalPrice > 1000 ? "bg-green-500" : "bg-indigo-500"} transition-all duration-500 ease-out`}
//       style={{ width: `${progress}%` }}
//     />
//   </div>

//   <div className="mt-2 flex gap-2 justify-start text-zinc-500">
//     <TruckElectric size={19} />
//     <p className="">
//       Free Delivery on all orders over <u className='font-medium'>EGP 1000</u>
//     </p>
//   </div>

//   <Link href="/shop" className='underline LINK mt-2'><p>Get free delivery!</p></Link>
// </div>

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
