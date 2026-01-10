import { useState, useEffect } from "react";
import { Link } from "react-router";
import { SmallHeaderText } from "./UI/HeaderText";



export default function MainAdsSection({ Array }: { Array: string[] }) {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        if (!Array.length) return;

        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % Array.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [Array.length]);



    return (
        <section className="flex flex-row w-full overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {Array.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        className="min-w-full h-full px-5 object-cover"
                        alt="ad"
                    />
                ))}
            </div>


            <div
                className="hidden md:flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {Array.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        className="min-w-full h-full px-5 object-cover"
                        alt="ad"
                    />
                ))}
            </div>
        </section>
    );
}



// 
export function AdsSection({ Array, Title, ColHandle }: { Array: any[], Title: string, ColHandle: string }) {
    return (
        <section
            className='w-full flex flex-col gap-3 md:rounded-3xl rounded-2xl p-3 bg-zinc-50'
        >
            <SmallHeaderText SUBHEAD={Title} />


            <div className='w-full flex flex-row gap-3 overflow-x-auto h-fit '>
                {Array.map((ad, index) => (
                    <Link
                        to={`/collections/${ColHandle}`}
                        key={index}
                        className='w-[45%] max-h-50 aspect-2/1 overflow-hidden bg-center flex flex-col items-start justify-center md:rounded-3xl rounded-2xl'
                    >

                        <img
                            src={ad}
                            alt={Title}
                            className='object-cover w-full h-full rounded-xl'
                        />
                    </Link>
                ))}
            </div>
        </section>
    )
}
