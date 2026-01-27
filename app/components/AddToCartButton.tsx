import { type FetcherWithComponents } from 'react-router';
import { CartForm, type OptimisticCartLineInput } from '@shopify/hydrogen';



export function AddToCartButton({ analytics, children, disabled, lines, onClick, CC }: { analytics?: unknown; children: React.ReactNode; disabled?: boolean; lines: Array<OptimisticCartLineInput>; onClick?: () => void; CC?: string; }) {



  // console.log(`%c${JSON.stringify(lines)}`, 'color: red; font-size: 20px;')
  // console.log(`%c${JSON.stringify(disabled)}`, 'color: red; font-size: 20px;')



  return (
    <CartForm route="/cart" inputs={{ lines }} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <div className='w-full flex items-end justify-end'>
            <button
              type="submit"
              className={` ${CC} ${disabled ? 'text-white bg-orange-100 md:rounded-3xl rounded-2xl cursor-not-allowed items-center justify-center px-3 py-1.5 font-medium duration-300 text-nowrap md:px-7 md:py-3 md:text-sm text-xs' : `BUTTON1`}`}
              onClick={() => {
                onClick?.();
                // toast.success('Item added to cart');
              }}
              disabled={disabled || fetcher.state !== 'idle'}
            >
              <p>
                {children}
              </p>
            </button>
          </div>
        </>
      )}
    </CartForm>
  );
}
