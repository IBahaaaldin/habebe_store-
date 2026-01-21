import { Image } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment } from 'storefrontapi.generated';
import HeroText from "./UI/HeroText";
import ArrowButton, { SliderButtons } from './ReUsable/Buttons';
import { Link } from 'react-router';
import { number } from 'framer-motion';
import { useState } from 'react';



// Used in two main places: "HOMEPAGE" and "COLLECTION" Page
export default function CollectionsHero({ Collections, Title, Description, HeroImg }: { Collections: FeaturedCollectionFragment, Title?: string, Description?: string, HeroImg?: string; }): JSX.Element {


    const defaultHeroImage = HeroImg ?? "https://images.pexels.com/photos/33020904/pexels-photo-33020904.jpeg"

    const headText = Title ?? "Buy now, Regret later.";
    const subText = Description ?? "Explore a curated selection of unique products, designed to inspire and delight. Find exactly what you need, or stumble upon something new.";



    return (
        <div className='w-full md:rounded-2xl rounded-xl overflow-hidden px-[3%] mx-auto relative text-white flex flex-col gap-20 justify-center items-start py-20 '>
            <article className='max-w-[80%] mx-auto text-center z-10 w-full relative flex flex-col items-center gap-10'>

                <HeroText
                    HEAD={headText}
                    SUBHEAD={subText}
                />


                <ArrowButton
                    CC={"w-fit"}
                    Href={`/collections/${Collections?.handle ?? ''}`}
                    Text="EXPLORE COLLECTION"
                />
            </article>



            {/* ABSOLUTE SECTION */}
            <Image
                src={defaultHeroImage}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover brightness-70"
            />
        </div>
    );
};



// TwoGrids component displays two grid items with images, titles, and buttons.
export function TwoGrids({ subTwoMenus }: { subTwoMenus?: any }) {


    if (subTwoMenus?.length <= 1) {
        return null
    }

    return (
        <div className="grid grid-cols-2 gap-3 items-center md:h-50 h-40">
            {subTwoMenus?.map((subMenu: any) => (
                <Link to={`/collections/${subMenu.handle}`}
                    key={subMenu.id}
                    className='h-full w-full p-5 flex md:flex-row flex-col md:items-end items-start md:justify-between justify-end md:rounded-2xl rounded-xl overflow-hidden relative gap-5 text-white'
                >
                    <Image
                        data={subMenu.image}
                        alt={subMenu.altText}
                        className='absolute inset-0 -z-1 h-full w-full object-cover brightness-75'
                    />

                    <h5 className='mmax-w-sm'>{subMenu.title}</h5>
                </Link>
            ))}
        </div>
    );
}





// AllCategories component displays a horizontal scrollable list of collection categories.
export function AllCategories({ allSubMenus }: { allSubMenus?: any }) {


    const [currentIndex, setCurrentIndex] = useState<number>(0)


    if (!Array.isArray(allSubMenus)) {
        return null;
    }


    return (
        <div className="relative overflow-hidden">


            {/* SLIDES */}
            <article
                className="flex gap-3 transition-transform duration-500 ease-in-out overflow-scroll"
            >
                {allSubMenus?.map((menu: any) => (
                    <Link
                        key={menu.id || menu.handle}
                        to={`/collections/${menu.handle ?? menu.resource?.handle}`}
                        className="group relative shrink-0 w-40 h-24 rounded-xl overflow-hidden"
                    >
                        <Image
                            data={menu.image ?? menu.resource?.image}
                            alt={menu.altText || menu.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <span className="absolute bottom-2 left-2 text-white font-bold bg-black/30 px-2 py-1 rounded-xl max-w-[80%]">
                            {menu.title}
                        </span>
                    </Link>
                ))}
            </article>
        </div>
    );
};
