import { Link, useNavigate } from 'react-router';
import { type MappedProductOptions } from '@shopify/hydrogen';
import type { Maybe, ProductOptionValueSwatch, } from '@shopify/hydrogen/storefront-api-types';
import { AddToCartButton } from './AddToCartButton';
import { useAside } from './Aside';
import type { ProductFragment } from 'storefrontapi.generated';
import { QuantityButton } from './MINE/ReUsable/Buttons';
import { useState, type ReactNode } from 'react';
import { ShieldCheck, Truck, RefreshCcw, Shirt } from 'lucide-react';



export function ProductForm({ productOptions, selectedVariant, }: { productOptions: MappedProductOptions[]; selectedVariant: ProductFragment['selectedOrFirstAvailableVariant']; }) {



  const navigate = useNavigate();
  const { open } = useAside();

  const [quantity, setQuantity] = useState<number>(1)

  return (
    <section>
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div key={option.name}>

            {/* TITLE for Size & Color */}
            <p className='text-zinc-300 mb-3'>Pick your {option.name}</p>


            <div className="flex flex-row flex-wrap w-full gap-3">
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
                      className={`md:px-4 px-3 py-2 rounded-full border text-nowrap duration-300 text-xs
                        ${!available
                          ? 'opacity-30 line-through decoration-wavy text-black cursor-not-allowed ' : `
                            ${option.name.toLowerCase() === 'size' &&
                          (selected
                            ? 'bg-black text-white'
                            : ' cursor-pointer text-black hover:bg-black hover:text-white')
                          }
                            ${option.name.toLowerCase() === 'color' &&
                          (selected
                            ? 'bg-black text-white'
                            : ' cursor-pointer text-black hover:bg-black hover:text-white')
                          }
                          `}
                      `}
                      disabled={!exists || !available}
                      onClick={() => {
                        if (!selected && exists) {
                          void navigate(`?${variantUriQuery}`, { replace: true, preventScrollReset: true });
                        }
                      }}
                      style={{

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




      <div className='flex flex-row gap-5 w-full'>
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          CC='w-full'
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
          {selectedVariant?.availableForSale ? `Add to Cart` : 'Sold out'}
        </AddToCartButton>


        <QuantityButton CC="bg-white hover:bg-white/50" MCC={"bg-zinc-100"} quantity={quantity} setQuantity={setQuantity} />
      </div>

      <br />

      <Features />

    </section >
  );
}


function ProductOptionSwatch({ swatch, name, }: { swatch?: Maybe<ProductOptionValueSwatch> | undefined; name: string; }) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;


  if (!image && !color) return name;



  return (
    <span
      aria-label={name}
      className={`w-10 h-10 rounded-full `}
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {/* {color} */}
      {!!image && <img src={image} alt={name} />}
    </span>
  );
}







interface FeatureProps {
  icon: ReactNode;          // Can be an SVG, icon component, emoji, etc.
  text: string;
}

export function Features() {


  const features: FeatureProps[] = [
    { icon: <ShieldCheck size={20} />, text: "Secure payment" },
    { icon: <Shirt size={20} />, text: "Size & Fit" },
    { icon: <Truck size={20} />, text: "Free shipping" },
    { icon: <RefreshCcw size={20} />, text: "Free Shipping & Returns" },
  ] as const;


  return (
    <div className="grid grid-cols-2 gap-3 text-zinc-700">
      {features.map((feature) => (
        <div key={feature.text} className="flex flex-row items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-xl w-fit">{feature.icon}</div>
          <span>{feature.text}</span>
        </div>
      ))}
    </div>
  );
}
