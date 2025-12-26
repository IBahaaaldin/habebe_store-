import { type FetcherWithComponents } from 'react-router';
import { CartForm, type OptimisticCartLineInput } from '@shopify/hydrogen';
// import { toast } from 'react-toastify';



export function AddToCartButton({ analytics, children, disabled, lines, onClick, CC }: { analytics?: unknown; children: React.ReactNode; disabled?: boolean; lines: Array<OptimisticCartLineInput>; onClick?: () => void; CC?: string; }) {



  return (
    <CartForm route="/cart" inputs={{ lines }} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            className={`${disabled ? 'opacity-50 bg-zinc-100 rounded-full px-5 py-3 cursor-not-allowed' : 'button1'}  ${CC}`}
            onClick={() => {
              onClick?.();
              // toast.success('Item added to cart');
            }}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}
