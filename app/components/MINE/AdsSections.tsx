import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Image } from "@shopify/hydrogen";
import { Calendar, Ticket, ChevronRight } from 'lucide-react';
import { SliderButtons, SmallIndexButtons } from "./ReUsable/Buttons";




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
                {bannerArray?.map((ad: any, index: number) => (
                    <Image
                        key={index}
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
export function ScrollAdsSection({ bannerArray, Title, collectionHandle }: { bannerArray: any[], Title: string, collectionHandle: string }) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (!bannerArray?.length) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => prev === bannerArray.length - 1 ? 0 : prev + 1);
        }, 5000); // 5 seconds

        return () => clearInterval(intervalId);
    }, [bannerArray?.length, currentIndex]);





    if (!Array.isArray(bannerArray)) {
        return null
    }





    return (
        <section className="relative w-full flex flex-col gap-3 md:rounded-2xl rounded-xl p-2 bg-zinc-50">

            <div className="w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {bannerArray.map((banner: any) => (
                        <Link
                            to={`/collections/${collectionHandle}`}
                            key={banner.image.url}
                            className="min-w-full h-50 overflow-hidden bg-center flex items-center justify-center rounded-2xl"
                        >
                            <Image
                                data={banner.image}
                                alt={Title}
                                className="object-cover w-full h-full rounded-xl"
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <SliderButtons
                changeIndex={setCurrentIndex}
                passedArray={bannerArray}
            />

        </section>

    )
}



// Grid Banners
export function GridAdsSection({ bannerArray, collectionHandle }: { bannerArray: any[], collectionHandle: string }) {


    if (!Array.isArray(bannerArray)) {
        return null;
    }


    return (
        <section className="w-full overflow-x-scroll flex flex-row sm:grid grid-cols-2 lg:grid-cols-4 gap-3 ">
            {bannerArray.map((banner: any, index: number) => (
                <figure key={index} className="object-cover min-w-[70%] sm:w-full h-full rounded-xl overflow-hidden">
                    <Image
                        key={index}
                        data={banner?.image}
                        alt={`${collectionHandle}`}
                        className='md:rounded-2xl rounded-xl'
                    />
                </figure>
            ))}
        </section>
    )
}






export function EventAdsSection({ bannerArray, collectionHandle }: { bannerArray: any, collectionHandle: string }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (!bannerArray?.length) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => prev === bannerArray.length - 1 ? 0 : prev + 1);
        }, 7000); // 5 seconds

        return () => clearInterval(intervalId);
    }, [bannerArray?.length, currentIndex]);





    if (!Array.isArray(bannerArray)) {
        return null;
    }




    return (
        <section className="relative">

            <div className="relative w-full overflow-hidden md:rounded-2xl rounded-xl">
                <div
                    className="flex h-60 transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {bannerArray.map((banner: any) => (
                        <div
                            key={banner.image.url}
                            className="flex min-w-full border border-black/10 rounded-2xl shadow-[0px_0px_15px_-10px] overflow-hidden"
                        >
                            {/* Image */}
                            <Image
                                data={banner.image}
                                alt={collectionHandle}
                                className="min-w-[50%] h-full object-cover"
                            />

                            {/* Content */}
                            <div className="relative p-5 flex flex-col justify-center gap-2 w-full">
                                <h3 className="font-bold uppercase">
                                    {collectionHandle} Collection
                                </h3>

                                <p>
                                    Go and buy something you son of a bitch. Just kidding, have a good day.
                                </p>

                                <Link
                                    to={`collections/${collectionHandle}`}
                                    className="absolute right-5 bottom-5 bg-zinc-100 shadow hover:bg-white duration-300 p-2 rounded-full"
                                >
                                    <ChevronRight size={24} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


                {/* BUTTONS to change between them */}
                <SmallIndexButtons
                    changeIndex={setCurrentIndex}
                    currentIndex={currentIndex}
                    passedArray={bannerArray}
                />
            </div>


            {/* Footer Section */}
            <div className="pt-5 w-full text-end">
                <span className="text-gray-600 text-sm">
                    Sponsors &nbsp;
                    <Link
                        to={"#"}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Advertising with us
                    </Link>
                </span>
            </div>
        </section>

    );
};
