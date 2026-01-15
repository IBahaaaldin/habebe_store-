import { type FetcherWithComponents } from 'react-router';
import { CartForm, type OptimisticCartLineInput } from '@shopify/hydrogen';



export function AddToCartButton({ analytics, children, disabled, lines, onClick, CC }: { analytics?: unknown; children: React.ReactNode; disabled?: boolean; lines: Array<OptimisticCartLineInput>; onClick?: () => void; CC?: string; }) {



  // console.log(`%c${JSON.stringify(lines)}`, 'color: red; font-size: 20px;')



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
              className={`text-nowrap md:p-1.5 p-1 ${disabled ? ' text-white bg-orange-100 rounded-full cursor-not-allowed' : `bg-orange-400 text-white rounded-lg hover:bg-orange-300 duration-300 cursor-pointer`} ${CC}`}
              onClick={() => {
                onClick?.();
                // toast.success('Item added to cart');
              }}
              disabled={disabled || fetcher.state !== 'idle'}
            >
              <span>
                {children}
              </span>
            </button>
          </div>
        </>
      )}
    </CartForm>
  );
}
