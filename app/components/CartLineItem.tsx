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
    <li key={id} className="border border-zinc-300 p-3 md:rounded-3xl rounded-2xl flex flex-row justify-between gap-3">



      {/* /// Left side: Image and Quantity controls */}
      <div className='flex flex-row gap-3'>
        <article className='flex flex-col gap-1 '>
          {/* Image */}
          {image && (
            <Link
              to={lineItemUrl}
              className='w-35 min-h-full p-1.5 rounded-2xl overflow-hidden bg-zinc-100 flex'>
              <Image
                className='object-cover w-full h-full aspect-square rounded-xl overflow-hidden'
                alt={title}
                data={image}
                loading="lazy"
              />

            </Link>
          )}

        </article>



        {/* /// Details */}
        <article className='flex flex-row justify-between w-full'>
          {/* LEFT */}
          <div className='flex flex-col justify-between gap-3'>
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') {
                  close();
                }
              }}
            >
              <h5 className=' uppercase text-wrap max-w-sm overflow-hidden hover:underline'>
                {product.title.length > 50 ? product.title.slice(0, 50) + "..." : product.title}
              </h5>
            </Link>


            <div>
              {selectedOptions.map((option) => (
                <div key={option.name}>
                  <span className='text-black'>{option.name}</span>: <span className='text-zinc-400 font-medium'>{option.value}</span>
                </div>
              ))}
            </div>


            <ProductPrice price={line?.cost?.totalAmount} />
          </div>

        </article>
      </div>



      {/* /// DELETE AND INCREASE */}
      <article className='flex flex-col items-end justify-between'>
        <CartLineRemoveButton lineIds={[id]} disabled={false} />

        {/* Quantity controls */}
        <CartLineQuantity line={line} />
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


  // console.log(`%c${JSON.stringify(line, null, 3)}`, 'color: white; font-size: 20px;')

  return (
    <div className="flex flex-row items-center justify-center bg-zinc-100 w-full h-fit p-1.5 py-1 rounded-full gap-2">

      <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <Minus size={25} className='hover:bg-white/0 duration-300 bg-white rounded-full p-1 cursor-pointer' />
        </button>
      </CartLineUpdateButton>

      <h4 className='text-black font-medium leading-tight'>{quantity}</h4>

      <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
        >
          <Plus size={25} className='hover:bg-white/0 duration-300 bg-white rounded-full p-1 cursor-pointer' />
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
        <Trash2 className='text-red-600 p-2 rounded-xl w-8 h-8 bg-red-100' />
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
