import type { CartApiQueryFragment } from 'storefrontapi.generated';
import type { CartLayout } from '~/components/CartMain';
import { CartForm, Money, type OptimisticCart } from '@shopify/hydrogen';
import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';
import type { FetcherWithComponents } from 'react-router';
import { ArrowBigRight, CircleChevronRight } from 'lucide-react';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({ cart, layout }: CartSummaryProps) {


  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';


  return (
    <div
      aria-labelledby="cart-summary" className="w-full"
    >
      <h3 className='text-3xl font-bold'>Order Summary</h3>

      <dl className="flex flex-row justify-between">
        <dt className='text-zinc-300'>Subtotal</dt>
        <dd className=' font-bold'>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>

      <dl className="flex flex-row justify-between">
        <dt className='text-zinc-300'>Discounts</dt>
        <dd className='text-red-500 font-bold'>-$320</dd>
      </dl>

      <dl className="flex flex-row justify-between">
        <dt className='text-zinc-300'>Delivery fee</dt>
        <dd className=' font-bold'>$17</dd>
      </dl>


      <dl className="text-2xl flex flex-row justify-between border-t border-zinc-300 py-3">
        <dt className='text-zinc-300'>Total</dt>
        <dd className='font-bold'>
          {typeof cart?.cost?.totalAmount?.amount === 'string'
            ? `$${Number(cart.cost.totalAmount.amount) - (317 + 17)}`
            : '-'}
        </dd>
      </dl>


      <div className='flex flex-col gap-3'>
        <CartDiscounts discountCodes={cart?.discountCodes} />
        {/* <CartGiftCard giftCardCodes={cart?.appliedGiftCards} /> */}
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




// Form to update discount codes
function CartDiscounts({ discountCodes, }: { discountCodes?: CartApiQueryFragment['discountCodes']; }) {



  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];



  return (
    <div className='w-full'>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className='flex flex-row items-center justify-between'>
        <dt className='text-zinc-300'>Discount(s)</dt>
        <UpdateDiscountForm>
          <div className="cart-discount">
            {/* <code>{codes?.join(', ')}</code> */}
            <button className='BUTTON1'>Remove</button>
          </div>
        </UpdateDiscountForm>
      </dl>


      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className='flex flex-row gap-3 min-w-full'>
          <input
            className='w-full px-5 py-1 rounded-full bg-zinc-100'
            type="text"
            name="discountCode" placeholder="Discount code"
          />

          <button className='BUTTON1' type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}



// Form to update discount codes
function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}



// function CartGiftCard({
//   giftCardCodes,
// }: {
//   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
// }) {
//   const appliedGiftCardCodes = useRef<string[]>([]);
//   const giftCardCodeInput = useRef<HTMLInputElement>(null);
//   const giftCardAddFetcher = useFetcher({ key: 'gift-card-add' });

//   // Clear the gift card code input after the gift card is added
//   useEffect(() => {
//     if (giftCardAddFetcher.data) {
//       giftCardCodeInput.current!.value = '';
//     }
//   }, [giftCardAddFetcher.data]);

//   function saveAppliedCode(code: string) {
//     const formattedCode = code.replace(/\s/g, ''); // Remove spaces
//     if (!appliedGiftCardCodes.current.includes(formattedCode)) {
//       appliedGiftCardCodes.current.push(formattedCode);
//     }
//   }

//   return (
//     <div>
//       {/* Display applied gift cards with individual remove buttons */}
//       {giftCardCodes && giftCardCodes.length > 0 && (
//         <dl>
//           <dt>Applied Gift Card(s)</dt>
//           {giftCardCodes.map((giftCard) => (
//             <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
//               <div className="cart-discount">
//                 <code>***{giftCard.lastCharacters}</code>
//                 &nbsp;
//                 <Money data={giftCard.amountUsed} />
//                 &nbsp;
//                 <button type="submit">Remove</button>
//               </div>
//             </RemoveGiftCardForm>
//           ))}
//         </dl>
//       )}

//       {/* Show an input to apply a gift card */}
//       <UpdateGiftCardForm
//         giftCardCodes={appliedGiftCardCodes.current}
//         saveAppliedCode={saveAppliedCode}
//         fetcherKey="gift-card-add"
//       >
//         <div>
//           <input
//             type="text"
//             name="giftCardCode"
//             placeholder="Gift card code"
//             ref={giftCardCodeInput}
//           />
//           &nbsp;
//           <button type="submit" disabled={giftCardAddFetcher.state !== 'idle'}>
//             Apply
//           </button>
//         </div>
//       </UpdateGiftCardForm>
//     </div>
//   );
// }

// function UpdateGiftCardForm({
//   giftCardCodes,
//   saveAppliedCode,
//   fetcherKey,
//   children,
// }: {
//   giftCardCodes?: string[];
//   saveAppliedCode?: (code: string) => void;
//   fetcherKey?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <CartForm
//       fetcherKey={fetcherKey}
//       route="/cart"
//       action={CartForm.ACTIONS.GiftCardCodesUpdate}
//       inputs={{
//         giftCardCodes: giftCardCodes || [],
//       }}
//     >
//       {(fetcher: FetcherWithComponents<any>) => {
//         const code = fetcher.formData?.get('giftCardCode');
//         if (code && saveAppliedCode) {
//           saveAppliedCode(code as string);
//         }
//         return children;
//       }}
//     </CartForm>
//   );
// }

// function RemoveGiftCardForm({
//   giftCardId,
//   children,
// }: {
//   giftCardId: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <CartForm
//       route="/cart"
//       action={CartForm.ACTIONS.GiftCardCodesRemove}
//       inputs={{
//         giftCardCodes: [giftCardId],
//       }}
//     >
//       {children}
//     </CartForm>
//   );
// }
