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
            {/* <button
              type="submit"
              className={`text-nowrap px-3.5 py-2.5 md:rounded-2xl rounded-2xl ${disabled ? ' text-white bg-orange-100 rounded-xl cursor-not-allowed' : `bg-orange-400 text-white  hover:bg-orange-300 duration-300 cursor-pointer`} ${CC}`}
              onClick={() => {
                onClick?.();
                // toast.success('Item added to cart');
              }}
              disabled={disabled || fetcher.state !== 'idle'}
            >
              <span>
                {children}
              </span>
            </button> */}
            <button
              type="submit"
              className={` ${disabled ? '' : `BUTTON1`} ${CC}`}
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
