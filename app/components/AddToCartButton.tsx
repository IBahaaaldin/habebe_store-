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
              className={`text-nowrap ${disabled ? 'hidden text-zinc-400 bg-orange-100 rounded-full px-5 py-3 cursor-not-allowed' : `BUTTON1`} ${CC}`}
              onClick={() => {
                onClick?.();
                // toast.success('Item added to cart');
              }}
              disabled={disabled || fetcher.state !== 'idle'}
            >
              {children}
            </button>
          </div>
        </>
      )}
    </CartForm>
  );
}
