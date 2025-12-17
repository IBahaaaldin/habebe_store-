import { Tag } from 'lucide-react'
import React from 'react'



export default function Prices({ price, currency, discount }: { price: string, currency: string, discount?: string }) {
    return (
        <article className='flex flex-row items-center gap-2'>
            <span className="text-xl text-black font-bold ">${price}</span>
            <span className="text-xl text-zinc-300 font-bold strike-through ">${Number(price) * 2}</span>

            <div className="ml-3 bg-red-500/10 items-center gap-1 px-2 py-1 rounded-xl text-red-600 text-xs flex flex-row text-nowrap font-semibold ">
                - {Math.round(((Number(price) + Number(price) / 2) - Number(price)) * 100) / 100}%
            </div>

        </article >
    )
}
