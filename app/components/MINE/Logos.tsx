import { useRef } from "react";
import AutoScrollArray from "./ReUsable/AutoScrollArray";
import { Image } from "@shopify/hydrogen";

const Logos = () => {
    const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein", "VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein", "VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];




    const reference = useRef<HTMLDivElement>(null)
    AutoScrollArray({ REFERENCE: reference })


    return (
        <div ref={reference} className="flex flex-row items-center justify-start gap-40 overflow-hidden w-full bg-black">
            {brands.map((logo, index) => (
                <div key={index} className="flex flex-row items-center gap-40">
                    <figure className="relative flex flex-col gap-2 py-10">
                        {/* <Image
                            src={logo}
                            alt="logo"
                            className="h-full w-full object-contain"
                        /> */}


                        <figcaption className="text-white text-nowrap text-center text-3xl">
                            {logo}
                        </figcaption>
                    </figure>
                </div>
            ))}
        </div>
    )
};

export default Logos;