import { useState, useEffect } from "react";
import { Link } from "react-router";
import { SmallHeaderText } from "./UI/HeaderText";
import { Image } from "@shopify/hydrogen";



// Main banner section
export default function MainAdsSection({ bannerArray }: { bannerArray?: any }) {

    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        if (!bannerArray?.length) return;

        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % bannerArray.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerArray?.length]);



    return (
        <section className="flex flex-row w-full overflow-hidden">
            <div
                className="flex h-40 transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {bannerArray?.map((ad: any, i: number) => (
                    <Image
                        key={i}
                        data={ad.image}
                        className="min-w-full h-full px-5 object-cover"
                        alt="ad"
                    />
                ))}
            </div>
        </section>
    );
}



// Scrollable Banners
export function ScrollAdsSection({ bannerArray, Title, ColHandle }: { bannerArray: any[], Title: string, ColHandle: string }) {

    if (!bannerArray || bannerArray?.length <= 0) {
        return null
    }

    return (
        <section
            className='w-full flex flex-col gap-3 md:rounded-2xl rounded-xl p-3 bg-zinc-50'
        >
            <SmallHeaderText SUBHEAD={Title} />


            <div className='w-full flex flex-row gap-3 overflow-x-auto h-fit '>
                {bannerArray.map((ad, index) => (
                    <Link
                        to={`/collections/${ColHandle}`}
                        key={index}
                        className='min-w-[80%] md:min-w-[40%] aspect-3/1 overflow-hidden bg-center flex flex-col items-start justify-center md:rounded-2xl rounded-xl'
                    >

                        <Image
                            data={ad.image}
                            alt={Title}
                            className='object-cover w-full h-full rounded-xl'
                        />
                    </Link>
                ))}
            </div>
        </section>
    )
}



// Grid Banners
export function GridAdsSection({ bannerArray, ColHandle }: { bannerArray: any[], ColHandle: string }) {


    if (!bannerArray || bannerArray?.length <= 0) {
        return null
    }


    return (
        <section className="w-full overflow-x-scroll flex flex-row sm:grid grid-cols-2 lg:grid-cols-4 gap-3 ">
            {bannerArray.map((ad, index) => (
                <figure key={index} className="object-cover min-w-[70%] sm:w-full h-full rounded-xl overflow-hidden">
                    <Image
                        key={index}
                        data={ad.image}
                        alt={`${ColHandle}`}
                        className='md:rounded-2xl rounded-xl'
                    />
                </figure>
            ))}
        </section>
    )
}
