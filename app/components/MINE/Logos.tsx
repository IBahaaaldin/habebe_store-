import { useRef } from "react";
import AutoScrollArray from "./ReUsable/AutoScrollArray";
// import { Image } from "@shopify/hydrogen";

const Logos = () => {
    const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein", "VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein", "VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];




    const reference = useRef<HTMLDivElement>(null)
    AutoScrollArray({ REFERENCE: reference })


    return (
        <div ref={reference} className="flex flex-row items-center justify-start gap-40 overflow-hidden w-full bg-black">
            {brands.map((logo, index) => (
                <div key={index} className="flex flex-row items-center lg:gap-40 gap-30">
                    <figure className="relative flex flex-col gap-2 lg:py-7 py-5">


                        <figcaption className="text-white text-nowrap text-center lg:text-3xl text-xl">
                            {logo}
                        </figcaption>
                    </figure>
                </div>
            ))}
        </div>
    )
};

export default Logos;