export default function Prices({ price, currency, discount }: { price: string, currency: string, discount?: string }) {
    return (
        <article className='flex flex-row flex-wrap items-center gap-2'>
            <span className="md:text-lg font-bold text-black">${price}</span>
            <span className="md:text-lg text-zinc-400 StrikeThrough ">${Number(price) * 2}</span>

            <div className="items-center gap-1 px-2 py-1 rounded-lg text-green-500 md:text-sm text-xs flex flex-row text-nowrap font-semibold ">
                - {Math.round(((Number(price) + Number(price) / 2) - Number(price)) * 100) / 100}%
            </div>

        </article >
    )
}
