import { Link, useNavigate } from 'react-router';
import { type MappedProductOptions } from '@shopify/hydrogen';
import type { Maybe, ProductOptionValueSwatch, } from '@shopify/hydrogen/storefront-api-types';
import { AddToCartButton } from './AddToCartButton';
import { useAside } from './Aside';
import type { ProductFragment } from 'storefrontapi.generated';



export function ProductForm({ productOptions, selectedVariant, }: { productOptions: MappedProductOptions[]; selectedVariant: ProductFragment['selectedOrFirstAvailableVariant']; }) {



  const navigate = useNavigate();
  const { open } = useAside();



  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div key={option.name}>

            {/* TITLE for Size & Color */}
            <h5 className='text-zinc-300 mb-3'>Pick your {option.name}</h5>


            <div className="flex flex-row gap-3">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;


                // console.log(`%c${name, handle, variantUriQuery, selected, available, exists, isDifferentProduct, swatch}`, 'color: red; font-size: 20px;');


                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                    // style={{
                    //   opacity: available ? (selected ? 1 : 0.2) : 0.3
                    // }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      key={option.name + name}
                      className={`
    cursor-pointer duration-300 transition-all
    ${option.name.toLowerCase() === 'size' ? 'px-5 py-3 rounded-full' : ''}
    ${option.name.toLowerCase() === 'size'
                          ? selected
                            ? 'bg-black text-white'
                            : 'bg-zinc-100 text-black hover:bg-black hover:text-white'
                          : ''
                        }
    ${option.name.toLowerCase() === 'color' ?
                          selected ? 'shadow-lg rounded-full scale-110 opacity-100' : 'opacity-50' : ''}
    ${!available ? 'opacity-40 cursor-not-allowed' : ''}
  `}
                      disabled={!exists || !available}
                      onClick={() => {
                        if (!selected && exists) {
                          void navigate(`?${variantUriQuery}`, { replace: true, preventScrollReset: true });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
            <br />
          </div>
        );
      })}
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        // onClick={() => {
        //   open('cart');
        // }}
        lines={
          selectedVariant
            ? [
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                selectedVariant,
              },
            ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}



function ProductOptionSwatch({ swatch, name, }: { swatch?: Maybe<ProductOptionValueSwatch> | undefined; name: string; }) {


  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;


  if (!image && !color) return name;



  return (
    <div
      aria-label={name}
      className={`w-10 h-10 rounded-full `}
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {/* {color} */}
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}
