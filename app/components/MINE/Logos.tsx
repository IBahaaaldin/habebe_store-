import { useRef } from "react";
import AutoScrollArray from "./ReUsable/AutoScrollArray";



export const PromotionArray = [
    "Premium quality products across all categories — enjoy exclusive discounts for a limited time",
    "Limited-time offers on best-selling items — save more before deals expire",
    "New products added regularly with special launch discounts just for you",
    "Top-rated by thousands of customers — shop with confidence and save today",
    "Carefully selected products that deliver real value — now available at discounted prices",
    "Fast and secure shipping on all orders with special savings on selected items",
    "Best value for your money with quality products and unbeatable deals",
    "Trending items everyone is buying — grab yours now with limited-time discounts",
    "Designed for everyday use with comfort and reliability — now on sale",
    "Upgrade your lifestyle today with exclusive promotions across the store",
    "Online-only deals you won’t find anywhere else — shop now and save more",
    "Trusted by customers worldwide — enjoy special prices while stock lasts",
    "Quality you can rely on, tested and reviewed — now available for less",
    "Shop smarter with limited-time deals on products you actually need",
    "Everything you need in one place — affordable prices, quality products, and fast delivery"
]



export default function Logos({ ArrayOfText }: { ArrayOfText?: string[] }) {
    const AltArray = ArrayOfText || PromotionArray



    const reference = useRef<HTMLDivElement>(null)
    AutoScrollArray({ REFERENCE: reference })



    return (
        <div ref={reference} className="flex flex-row items-center justify-start gap-20 overflow-hidden w-full bg-green-700">
            {AltArray.map((logo, index) => (
                <div key={index} className="flex flex-row items-center lg:gap-40 gap-30">
                    <q className="py-3 text-white text-nowrap text-center lg:text-3xl text-xl uppercase">
                        {logo}
                    </q>
                </div>
            ))}
        </div>
    )
};
