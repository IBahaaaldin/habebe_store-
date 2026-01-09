

// CC1 and CC2 
export default function Prices({ price, currency, CC1, CC2 }: { price: string, currency: string, CC1?: string, CC2?: string }) {


    const numericPrice = Number(price);
    let fakeOriginalPrice = numericPrice;
    let discountPercentage = 0;

    // Apply a 7% discount if the price is 500 or more
    if (numericPrice >= 500) {
        discountPercentage = 7;
    } // Apply a 10% discount if the price is between 100 and 499.99
    else if (numericPrice >= 100) {
        discountPercentage = 10;
    }

    if (discountPercentage > 0) {
        fakeOriginalPrice = numericPrice / (1 - discountPercentage / 100);
    }



    return (
        <article className='flex flex-col flex-wrap items-start'>
            <span className={`${CC1 ?? 'md:text-lg'} text-nowrap text-black font-bold`}>{currency} {numericPrice.toFixed(2)}</span>


            {discountPercentage > 0 &&
                (<span className={`${CC2 ?? 'md:text-sm'} text-zinc-400 line-through`}>
                    {fakeOriginalPrice.toFixed(2)}
                </span>)
            }

        </article >
    )
}
