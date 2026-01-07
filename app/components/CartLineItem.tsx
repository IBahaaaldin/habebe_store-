import type { CartLineUpdateInput } from '@shopify/hydrogen/storefront-api-types';
import type { CartLayout } from '~/components/CartMain';
import { CartForm, Image, type OptimisticCartLine } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from 'react-router';
import { ProductPrice } from './ProductPrice';
import { useAside } from './Aside';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { Minus, Plus, Trash2 } from 'lucide-react';



type CartLine = OptimisticCartLine<CartApiQueryFragment>;



// A SINGLE line item in the cart. It displays the PRODUCT image, title, price. It also provides controls to update the quantity or remove the line item.
export function CartLineItem({ layout, line, }: { layout: CartLayout; line: CartLine; }) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();



  return (
    <li key={id} className="border border-zinc-300 p-5 rounded-3xl flex flex-row gap-5">



      {/* Left side: Image and Quantity controls */}
      <article className='flex flex-col gap-1 '>
        {/* Image */}
        {image && (
          <Link
            to={lineItemUrl}
            className='min-w-40 min-h-40 w-40 h-40 p-1.5 rounded-2xl overflow-hidden bg-zinc-100 flex'>
            <Image
              className='object-cover w-full h-full aspect-square rounded-xl overflow-hidden'
              alt={title}
              data={image}
              loading="lazy"
            />

          </Link>
        )}

        {/* Quantity controls */}
        <CartLineQuantity line={line} />
      </article>



      {/* Details */}
      <article className='flex flex-row justify-between w-full'>
        {/* LEFT */}
        <article className='flex flex-col justify-between gap-3'>
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
          >
            <h2 className='text-xl uppercase text-wrap max-w-sm'>{product.title}</h2>
          </Link>


          <ul>
            {selectedOptions.map((option) => (
              <li key={option.name}>
                <small>
                  <span className='text-black'>{option.name}</span>: <strong className=''>{option.value}</strong>
                </small>
              </li>
            ))}
          </ul>


          <ProductPrice price={line?.cost?.totalAmount} />
        </article>


        {/* RIGHT */}
        <article className='flex sm:flex-col flex-row sm:items-start items-center justify-between'>
          <CartLineRemoveButton lineIds={[id]} disabled={false} />
        </article>
      </article>

    </li>
  );
}



// Provides the controls to update the quantity of a line item in the cart.
//  These controls are disabled when the line item is new, and the server
// hasn't yet responded that it was successfully added to the cart.
export function CartLineQuantity({ line }: { line: CartLine }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex flex-row items-center justify-center bg-zinc-100 w-full h-fit px-3 py-2 rounded-full gap-5">

      <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <Minus size={25} className='hover:bg-white rounded-full p-1 cursor-pointer' />
        </button>
      </CartLineUpdateButton>

      <strong className='text-black'>{quantity}</strong>

      <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
        >
          <Plus size={25} className='hover:bg-white rounded-full p-1 cursor-pointer' />
        </button>
      </CartLineUpdateButton>


    </div>
  );
}



// A button that removes a line item from the cart. It is disabled
// when the line item is new, and the server hasn't yet responded
// that it was successfully added to the cart.
function CartLineRemoveButton({ lineIds, disabled, }: { lineIds: string[]; disabled: boolean; }) {



  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button
        disabled={disabled}
        type="submit"
        className='w-full flex items-end justify-end cursor-pointer hover:opacity-50 duration-300'
      >
        <Trash2 className='text-red-600 p-2.5 rounded-full w-10 h-10 bg-red-100' />
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}



/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
