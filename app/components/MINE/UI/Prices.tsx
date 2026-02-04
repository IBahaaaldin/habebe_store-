import { useCurrency } from '~/lib/ContextProvider';

export const firstFakeDiscount = 7;
export const price1 = 20;

export const secondFakeDiscount = 10;
export const price2 = 50;

export const thirdFakeDiscount = 15;
export const price3 = 100;

export default function Prices({ price, isBig }: { price: string; isBig?: boolean }) {
    // 1. Get the current currency and rate from context
    const { selectedCurrency } = useCurrency();
    const { symbol, rate } = selectedCurrency;

    // 2. Convert price based on rate
    const basePrice = Number(price);
    const convertedPrice = basePrice * rate;

    let discountPercentage = 0;

    // 3. Calculate discount based on original USD tiers
    if (basePrice >= price3) {
        discountPercentage = thirdFakeDiscount;
    } else if (basePrice >= price2) {
        discountPercentage = secondFakeDiscount;
    } else if (basePrice >= price1) {
        discountPercentage = firstFakeDiscount;
    }

    const fakeOriginalPrice = discountPercentage > 0
        ? convertedPrice / (1 - discountPercentage / 100)
        : convertedPrice;

    // Helper for heading size
    const Tag = isBig ? 'h3' : 'h5';

    return (
        <article className='flex flex-col flex-wrap items-start'>
            <Tag className="text-nowrap text-black font-medium">
                {symbol}{convertedPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

                {discountPercentage > 0 && (
                    <>
                        {/* <span className="ml-2 text-red-300 font-bold">({discountPercentage}% OFF)</span> */}
                        <sup className="ml-2 text-red-300 line-through">
                            {fakeOriginalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </sup>
                    </>
                )}
            </Tag>
        </article>
    );
}