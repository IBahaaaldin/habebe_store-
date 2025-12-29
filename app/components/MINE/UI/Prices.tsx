export default function Prices({ price, currency }: { price: string, currency: string }) {
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
        <article className='flex flex-col flex-wrap items-start mt-3 '>
            <span className="md:text-lg text-black font-bold">{currency}{numericPrice.toFixed(2)}</span>


            {discountPercentage > 0 && (
                <span className="text-zinc-400 line-through">{fakeOriginalPrice.toFixed(2)}</span>
            )}


            {/* {discountPercentage > 0 && (
                <div className="items-center gap-1 px-2 py-1 rounded-lg text-green-500 md:text-sm text-xs flex flex-row text-nowrap font-semibold ">
                    - {discountPercentage}%
                </div>
            )} */}
        </article >
    )
}
