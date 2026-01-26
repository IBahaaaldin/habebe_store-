import { Image } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment } from 'storefrontapi.generated';
import HeroText from "./UI/HeroText";
import ArrowButton, { SliderButtons } from './ReUsable/Buttons';
import { Link } from 'react-router';
import { number } from 'framer-motion';
import { useState } from 'react';
import HeaderText, { SmallHeaderText } from './UI/HeaderText';



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





export function CollectionsNewHero({ Collections, Title, Description, HeroImg, subTwoMenus }: { Collections: FeaturedCollectionFragment, Title?: string, Description?: string, HeroImg?: string, subTwoMenus: any }) {


    const defaultHeroImage = HeroImg ?? "https://images.pexels.com/photos/33020904/pexels-photo-33020904.jpeg"

    const headText = Title ?? "Buy now, Regret later.";
    const subText = Description ?? "Explore a curated selection of unique products, designed to inspire and delight. Find exactly what you need, or stumble upon something new.";


    return (
        <div className="w-full flex flex-col gap-3">
            {/* /// Main Hero Banner */}
            <article className="text-white relative md:rounded-3xl rounded-2xl md:p-10 p-7 overflow-hidden md:h-100 h-70 flex flex-col justify-between">

                <HeroText
                    HEAD={"Modern Minimalist Furniture"}
                    SUBHEAD={subText}
                />

                <ArrowButton
                    CC={"w-fit"}
                    Href={`/collections/${Collections?.handle ?? ''}`}
                    Text="EXPLORE COLLECTION"
                />

                <Image
                    src={defaultHeroImage}
                    alt="Hero"
                    className="absolute -z-1 inset-0 w-full h-full object-cover"
                />
            </article>

            {Array.isArray(subTwoMenus) &&
                <TwoGrids subTwoMenus={subTwoMenus} />
            }
        </div>
    );
}



// TwoGrids component displays two grid items with images, titles, and buttons.
export function TwoGrids({ subTwoMenus }: { subTwoMenus?: any }) {


    if (!Array.isArray(subTwoMenus)) {
        return null;
    }

    console.log(`%c${JSON.stringify(subTwoMenus, null, 3)}`, 'color: white; font-size: 20px;')

    return (
        <div className="w-full flex flex-row gap-3 md:h-60 h-30">
            {subTwoMenus?.map((subMenu: any, index: number) => (
                <Link
                    to={`/collections/${subMenu.handle ?? subMenu.resource?.handle}`}
                    key={subMenu.id}
                    className={`group w-1/2 font-medium text-white
                    md:rounded-3xl rounded-2xl md:p-7 p-5
                    flex flex-col justify-between relative overflow-hidden h-full
                    ${index === 0 ? 'md:w-2/3' : 'md:w-1/3'}
                `}
                >
                    <Image
                        data={subMenu.image ?? subMenu.resource?.image}
                        alt={subMenu.altText}
                        className="absolute inset-0 -z-1 h-full w-full object-cover group-hover:scale-105 duration-500"
                    />


                    {/* <div
                        key={index}
                        className={`flex flex-col space-y-1 bg-black/10 absolute top-10 md:right-10 right-5 border-b-2 border-l border-white/10 backdrop-blur-sm md:p-3 p-3 md:rounded-3xl rounded-2xl ${index === 0 ? '-rotate-5 top-10' : 'rotate-10 top-20'} z-20 max-w-40 `}
                    >
                        <span className="font-medium leading-tight">UP TO 70% OFF</span>
                        <span className="font-thin leading-tight">On orders more than $100</span>
                    </div> */}

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


    const [currentIndex, setCurrentIndex] = useState<number>(0)


    if (!Array.isArray(allSubMenus)) {
        return null;
    }


    return (
        <div className="relative overflow-hidden">
            {/* SLIDES */}
            <article
                className="items-start justify-start flex gap-5 transition-transform duration-500 ease-in-out overflow-x-scroll"
            >
                {allSubMenus?.map((menu: any) => (
                    <Link
                        key={menu.id || menu.handle}
                        to={`/collections/${menu.handle ?? menu.resource?.handle}`}
                        className="group relative shrink-0 w-40 h-30 md:rounded-3xl rounded-2xl overflow-hidden"
                    >
                        <Image
                            data={menu.image ?? menu.resource?.image}
                            alt={menu.altText || menu.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <span className="absolute bottom-2 left-2 text-white font-medium bg-black/30 px-2 py-1 rounded-xl max-w-[80%]">
                            {menu.title}
                        </span>
                    </Link>
                ))}
            </article>
        </div>
    );
};
