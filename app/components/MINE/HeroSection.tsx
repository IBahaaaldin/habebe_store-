import { Image } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment } from 'storefrontapi.generated';
import HeroText from "./UI/HeroText";
import ArrowButton from './ReUsable/Buttons';
import { Link } from 'react-router';
import { SmallHeaderText } from './UI/HeaderText';




// Used in two main places: "HOMEPAGE" and "COLLECTION" Page
export default function HeroSection({ Collections, Title, Description, HeroImg }: { Collections: FeaturedCollectionFragment, Title?: string, Description?: string, HeroImg?: string; }): JSX.Element {


    const defaultHeroImage = HeroImg ?? "https://images.pexels.com/photos/33020904/pexels-photo-33020904.jpeg"

    const headText = Title ?? "Buy now, Regret later.";
    const subText = Description ?? "Explore a curated selection of unique products, designed to inspire and delight. Find exactly what you need, or stumble upon something new.";



    return (
        <div className='w-full md:rounded-2xl rounded-xl overflow-hidden px-[3%] mx-auto relative text-white flex flex-col gap-20 justify-center items-start py-10 min-h-[50vh]'>
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
export function AllCategories({ allMenus }: { allMenus?: any }) {

    if (allMenus?.length <= 1) {
        return null
    }


    return (
        <article className="flex flex-row md:gap-3 gap-2 overflow-x-scroll pb-5">
            {allMenus?.map((singleMenu: any) => (
                <Link
                    to={`/collections/${singleMenu?.handle ?? singleMenu?.resource?.handle}`}
                    // WWHY?? Because some menus are some are collection
                    key={singleMenu.title}
                    className="relative group cursor-pointer overflow-hidden md:rounded-2xl rounded-xl md:h-25 h-20 md:w-40 w-30"
                >
                    <Image
                        data={singleMenu?.image}
                        alt={singleMenu?.altText}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Label Badge */}
                    <span className="max-w-[80%] absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg text-start font-bold ">
                        {singleMenu.title}
                    </span>
                </Link>
            ))}
        </article>
    );
};
