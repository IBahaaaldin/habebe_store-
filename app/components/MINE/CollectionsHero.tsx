import { Image } from '@shopify/hydrogen';
import type { CollectionItemFragment } from 'storefrontapi.generated';
import HeroText from "./UI/HeroText";
import ArrowButton, { SliderButtons } from './ReUsable/Buttons';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import HeaderText from './UI/HeaderText';



// Used in two main places: "HOMEPAGE" and "COLLECTION" Page
export default function CollectionsHero({ Collections, Title, Description, HeroImg }: { Collections: CollectionItemFragment, Title?: string, Description?: string, HeroImg?: string; }): JSX.Element {


    const defaultHeroImage = HeroImg ?? "https://images.pexels.com/photos/33020904/pexels-photo-33020904.jpeg"

    const headText = Title ?? "Buy now, Regret later.";
    const subText = Description ?? "Explore a curated selection of unique products, designed to inspire and delight. Find exactly what you need, or stumble upon something new.";



    return (
        <div className='w-full md:rounded-3xl rounded-2xl overflow-hidden px-[3%] mx-auto relative text-white flex flex-col gap-20 justify-center items-start py-20 '>
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





export function CollectionsNewHero({ Collections, Title, Description, HeroImg, subTwoMenus }: { Collections: CollectionItemFragment, Title?: string, Description?: string, HeroImg?: string, subTwoMenus: any }) {


    const defaultHeroImage = HeroImg ?? "https://images.pexels.com/photos/33020904/pexels-photo-33020904.jpeg"

    const headText = Title ?? "Buy now, Regret later.";
    const subText = Description ?? "Explore a curated selection of unique products, designed to inspire and delight. Find exactly what you need, or stumble upon something new.";


    return (
        <div className="w-full flex flex-col gap-3 ">
            {/* /// Main Hero Banner */}
            <article className="text-white relative md:rounded-3xl rounded-2xl md:p-10 p-7 overflow-hidden max-h-150 h-[70vh] flex flex-col justify-center gap-5">

                <HeroText
                    HEAD={headText}
                    SUBHEAD={subText}
                />


                <Image
                    src={defaultHeroImage}
                    alt="Hero"
                    className="absolute -z-1 inset-0 w-full h-full object-cover"
                    sizes='100vw'
                    width={1000}
                    height={1000}
                    fetchPriority={'high'}

                />
            </article>
        </div>
    );
}



// TwoGrids component displays two grid items with images, titles, and buttons.
export function TwoGrids({ subTwoMenus }: { subTwoMenus?: any }) {


    if (!Array.isArray(subTwoMenus) || subTwoMenus.length === 0) {
        return null;
    }


    return (
        <div className="w-full flex flex-row gap-3 md:h-60 h-30">
            {subTwoMenus?.map((subMenu: any, index: number) => (
                <Link
                    to={`/collections/${subMenu.handle ?? subMenu.resource?.handle}`}
                    key={subMenu.id}
                    className={`group w-1/2 font-medium text-white 
                    md:rounded-3xl rounded-2xl md:p-7 p-5  border  border-black
                    flex flex-col justify-between relative overflow-hidden h-full
                    ${index === 0 ? 'md:w-2/3' : 'md:w-1/3'}
                `}
                >
                    <Image
                        data={subMenu.image ?? subMenu.resource?.image}
                        alt={subMenu.altText}
                        className="absolute inset-0 -z-1 h-full w-full object-cover group-hover:scale-105 duration-500"
                        sizes='400px'
                    />

                    <HeaderText
                        HEAD={subMenu.title}
                    />
                </Link>
            ))}
        </div>
    );
}




// AllCategories component displays a horizontal scrollable list of collection categories.
export function AllCategories({ allSubMenus }: { allSubMenus?: any }) {


    if (!Array.isArray(allSubMenus) || allSubMenus.length === 0) {
        return null;
    }



    return (
        <div className="relative">
            {/* SLIDES */}
            <article
                className=" flex items-start justify-start md:gap-7 gap-5 w-full transition-transform duration-500 ease-out overflow-x-scroll pb-3 ROW_SCROLL"
            >
                {allSubMenus?.map((menu: any) => (
                    <Link
                        to={`/collections/${menu.handle ?? menu.resource?.handle}`}
                        key={menu.id || menu.handle}
                        className='flex flex-col items-center gap-2'

                    >
                        <figure
                            className="group relative rounded-4xl md:w-25 w-20 overflow-hidden"
                        >
                            <Image
                                data={menu.image ?? menu.resource?.image}
                                alt={menu.altText || menu.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes='150px'
                                width={150}
                                height={150}
                            />
                        </figure>

                        <p className="text-black text-wrap text-center">
                            {menu.title.length > 20 ? menu.title.slice(0, 15) + "..." : menu.title}
                        </p>
                    </Link>
                ))}
            </article>
        </div>
    );
};
