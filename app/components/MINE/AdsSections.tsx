import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { Image } from "@shopify/hydrogen";
import { Calendar, Ticket, ChevronRight } from 'lucide-react'; import { SliderButtons, SliderButtonsss, SmallIndexButtons, useHorizontalSlider } from "./ReUsable/Buttons";
import HeaderText from "./UI/HeaderText";



// Main banner section
export default function MainBanners({ bannerArray }: { bannerArray?: any }) {

    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        if (!bannerArray?.length) return;

        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % bannerArray.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerArray?.length]);



    if (!Array.isArray(bannerArray) || bannerArray.length === 0) {
        return null
    }



    return (
        <section className="flex flex-row w-full bg-zinc-100  rounded-3xl overflow-hidden">
            <div
                className="flex h-50 transition-transform duration-700 "
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {bannerArray?.map((ad: any, index: number) => (
                    <Image
                        key={index}
                        data={ad.image}
                        className="min-w-full h-full object-cover rounded-3xl"
                        alt="ad"
                    />
                ))}
            </div>
        </section>
    );
}



// Scrollable Banners
export function ScrollBanners({ bannerArray, Title, collectionHandle }: { bannerArray?: any, Title: string, collectionHandle: string }) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (!bannerArray?.length) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => prev === bannerArray.length - 1 ? 0 : prev + 1);
        }, 5000); // 5 seconds

        return () => clearInterval(intervalId);
    }, [bannerArray?.length, currentIndex]);





    if (!Array.isArray(bannerArray) || bannerArray.length === 0) {
        return null
    }





    return (
        <section className="relative w-full flex flex-col gap-3 md:rounded-3xl rounded-2xl p-2 bg-zinc-50">

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
                            key={banner?.image?.url}
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

            {/* <SliderButtons
                changeIndex={setCurrentIndex}
                passedArray={bannerArray}
            /> */}

        </section>

    )
}



// Grid Banners
export function GridBanners({ bannerArray, collectionHandle }: { bannerArray: any, collectionHandle: string }) {


    if (!Array.isArray(bannerArray) || bannerArray.length === 0) {
        return null;
    }


    return (
        <section className="w-full overflow-x-scroll HIDDEN_SCROLL flex flex-row sm:grid grid-cols-2 lg:grid-cols-4 gap-3 ">
            {bannerArray.map((banner: any, index: number) => (
                <figure key={index} className="object-cover min-w-[70%] sm:w-full h-full rounded-xl overflow-hidden">
                    <Image
                        key={index}
                        data={banner?.image}
                        alt={`${collectionHandle}`}
                        className='md:rounded-3xl rounded-2xl'
                    />
                </figure>
            ))}
        </section>
    )
}


export function OverflowBanners({ bannerArray, collectionHandle }: { bannerArray?: any, collectionHandle?: string, }) {


    // if (!Array.isArray(bannerArray) || bannerArray.length === 0) {
    //     return null;
    // }
    const { containerRef, slideNext, slidePrev, disableNext, disablePrev } = useHorizontalSlider();


    const fakeBannerArray = [
        {
            image: {
                url: "https://images.pexels.com/photos/7282024/pexels-photo-7282024.jpeg",
                altText: "Banner 1",
            },
        },
        {
            image: {
                url: "https://images.pexels.com/photos/6990620/pexels-photo-6990620.jpeg",
                altText: "Banner 2",
            },
        },
        {
            image: {
                url: "https://images.pexels.com/photos/30379114/pexels-photo-30379114.jpeg",
                altText: "Banner 3",
            },
        },
        {
            image: {
                url: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg",
                altText: "Banner 3",
            },
        },
        {
            image: {
                url: "https://images.pexels.com/photos/5650016/pexels-photo-5650016.jpeg",
                altText: "Banner 3",
            },
        },
    ];



    return (
        <section className="relative flex flex-col gap-3">
            <div ref={containerRef} className="w-full overflow-x-scroll HIDDEN_SCROLL flex flex-row gap-3">
                {fakeBannerArray.map((banner: any, index: number) => (
                    <figure key={index} className="object-cover min-h-40 max-h-40 min-w-80 max-w-80 rounded-xl overflow-hidden">
                        <Image
                            key={index}
                            data={banner?.image}
                            sizes="200px"
                            alt={`${collectionHandle}` || "Banner"}
                            className='h-full w-full md:rounded-3xl rounded-2xl object-cover'
                        />
                    </figure>
                ))}
            </div>


            <SliderButtonsss
                next={() => slideNext(100)}
                prev={() => slidePrev(100)}
                disableNext={disableNext}
                disablePrev={disablePrev}
            />
        </section>
    )
}




export function PlatinumBanners({ bannerArray, collectionHandle }: { bannerArray?: any, collectionHandle: string }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (!bannerArray?.length) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => prev === bannerArray.length - 1 ? 0 : prev + 1);
        }, 7000); // 5 seconds

        return () => clearInterval(intervalId);
    }, [bannerArray?.length, currentIndex]);





    // if (!Array.isArray(bannerArray)) {
    //     return null;
    // }


    /// To be deleted
    const fakeData = [
        { image: "https://images.pexels.com/photos/6626361/pexels-photo-6626361.jpeg" },
        { image: "https://images.pexels.com/photos/9775888/pexels-photo-9775888.jpeg" },
        { image: "https://images.pexels.com/photos/4651334/pexels-photo-4651334.jpeg" },
    ]



    return (
        <section className="relative">
            <div className="relative w-full overflow-hidden">


                <div
                    className="flex md:h-70 h-50 transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {fakeData.map((banner: any) => (
                        <Link
                            to={`/collections/${collectionHandle}`}
                            key={banner?.image}
                            className="flex min-w-full border md:rounded-3xl rounded-2xl overflow-hidden"
                        >
                            {/* Image */}
                            <Image
                                src={banner?.image}
                                alt={collectionHandle}
                                className="min-w-[60%] h-full object-cover object-center"

                            />


                            {/* Content */}
                            <article className="bg-orange-50 relative p-5 flex flex-col justify-center gap-2 w-full">
                                <h4 className="font-medium uppercase">
                                    {collectionHandle} Collection
                                </h4>

                                <span>
                                    Go and buy something you son of a bitch.
                                </span>
                            </article>
                        </Link>
                    ))}
                </div>


                {/* BUTTONS to change between them */}
                <SmallIndexButtons
                    changeIndex={setCurrentIndex}
                    currentIndex={currentIndex}
                    passedArray={fakeData}
                />


                <SliderButtons
                    itemsToShow={1}
                    changeIndex={setCurrentIndex}
                    passedArray={fakeData}
                />
            </div>
        </section>
    );
};




type Banner = { image?: any };


/// Casual Banners
export function CasualBanners({ bannerArray, collectionHandle }: { bannerArray: Banner[], collectionHandle: string }) {


    if (!Array.isArray(bannerArray) || bannerArray.length === 0) {
        return null;
    }


    return (
        <section className="flex flex-col sm:flex-row gap-2 md:h-80">
            {/* LEFT */}
            <Link
                to={`/collections/${collectionHandle}`}
                aria-label={collectionHandle}
                className="md:rounded-3xl rounded-2xl md:h-full h-40 sm:w-2/3 overflow-hidden border"
            >
                <Image
                    data={bannerArray[0]?.image}
                    alt={collectionHandle}
                    className="object-cover w-full h-full hover:scale-105  duration-500"
                />
            </Link>


            {/* /// RIGHT */}
            <div className="w-full h-full sm:w-1/3 flex sm:flex-col flex-row gap-2">
                {bannerArray.slice(1, 3).map((banner: any, index) => (
                    <Link
                        key={index}
                        to={`/collections/${collectionHandle}`}
                        aria-label={collectionHandle}
                        className="w-full md:h-full h-20 relative md:rounded-3xl rounded-2xl overflow-hidden border"
                    >
                        <Image
                            data={banner?.image}
                            alt={collectionHandle}
                            className="object-cover  h-full w-full hover:scale-105 duration-500"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};
