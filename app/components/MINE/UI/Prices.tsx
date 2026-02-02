
export const firstFakeDiscount = 7
export const price1 = 20

export const secondFakeDiscount = 10
export const price2 = 50

export const thirdFakeDiscount = 15
export const price3 = 100

// CC1 and CC2
export default function Prices({ price, currency, isBig }: { price: string, currency: string, isBig?: boolean }) {


    const numericPrice = Number(price);
    let fakeOriginalPrice = numericPrice;
    let discountPercentage = 0;

    // Calculate discount based on price tiers
    if (numericPrice >= price3) {
        discountPercentage = thirdFakeDiscount;
    } else if (numericPrice >= price2) {
        discountPercentage = secondFakeDiscount;
    } else if (numericPrice >= price1) {
        discountPercentage = firstFakeDiscount;
    }

    // Calculate fake original price if there's a discount
    if (discountPercentage > 0) {
        fakeOriginalPrice = numericPrice / (1 - discountPercentage / 100);
    }



    return (
        <article className='flex flex-col flex-wrap items-start'>
            {isBig ? (
                <h3 className={`mt-3 text-nowrap text-black font-medium`}>
                    {currency} {numericPrice.toFixed(2)}
                    {discountPercentage > 0 && (
                        <span className="ml-2 text-red-300 font-bold">({discountPercentage}% OFF)</span>
                    )}
                    {discountPercentage > 0 && (
                        <sup className={`ml-2 text-zinc-400 line-through`}>
                            {fakeOriginalPrice.toFixed(2)}
                        </sup>
                    )}
                </h3>
            ) : (
                <h5 className={`text-nowrap text-black font-medium`}>
                    {currency} {numericPrice.toFixed(2)}
                    {discountPercentage > 0 && (
                        <span className="ml-2 text-red-300 font-bold">({discountPercentage}% OFF)</span>
                    )}
                    {discountPercentage > 0 && (
                        <sup className={`ml-2 text-zinc-400 line-through`}>
                            {fakeOriginalPrice.toFixed(2)}
                        </sup>
                    )}
                </h5>
            )}
        </article>
    )
}
