

// CC1 and CC2 
export default function Prices({ price, currency, isBig }: { price: string, currency: string, isBig?: boolean }) {


    const numericPrice = Number(price);
    let fakeOriginalPrice = numericPrice;
    let discountPercentage = 0;

    // Apply a 7% discount if the price is 500 or more
    if (numericPrice >= 200) {
        discountPercentage = 7;
    } // Apply a 10% discount if the price is between 100 and 499.99
    else if (numericPrice >= 50) {
        discountPercentage = 10;
    }

    if (discountPercentage > 0) {
        fakeOriginalPrice = numericPrice / (1 - discountPercentage / 100);
    }



    return (
        <article className='flex flex-col flex-wrap items-start'>
            {/* <h5 className={`text-nowrap text-black font-medium`}>{currency} {numericPrice.toFixed(2)}</h5> */}

            {isBig ?
                <h3 className={`mt-3 text-nowrap text-black font-medium`}>{currency} {numericPrice.toFixed(2)}
                    <sup className={`ml-2 text-zinc-400 line-through`}>
                        {fakeOriginalPrice.toFixed(2)}
                    </sup>
                </h3>
                :
                <h5 className={`text-nowrap text-black font-medium`}>{currency} {numericPrice.toFixed(2)}
                    <sup className={`ml-2 text-zinc-400 line-through`}>
                        {fakeOriginalPrice.toFixed(2)}
                    </sup>
                </h5>
            }

        </article>
    )
}
