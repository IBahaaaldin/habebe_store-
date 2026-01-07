import { Image } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment } from 'storefrontapi.generated';
import HeroText from "./UI/HeroText";
import ArrowButton from './ReUsable/Buttons';
import { Link } from 'react-router';




// Used in two main places: "HOMEPAGE" and "COLLECTION" Page
export default function HeroSection({ Collections, Title, Description, HeroImg }: { Collections: FeaturedCollectionFragment, Title?: string, Description?: string, HeroImg?: string; }): JSX.Element {



    const defaultHeroImage = HeroImg ?? "https://images.pexels.com/photos/33020904/pexels-photo-33020904.jpeg"

    const headText = Title ?? "Buy now, Regret later.";
    const subText = Description ?? "Explore a curated selection of unique products, designed to inspire and delight. Find exactly what you need, or stumble upon something new.";



    return (
        <div className='mb-3 w-full rounded-3xl overflow-hidden px-[3%] mx-auto relative text-white flex flex-col gap-20 justify-center items-start py-10'>
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


    return (
        <div className="grid grid-cols-2 gap-3 items-center h-50 " >
            {subTwoMenus?.map((subMenu: any) => (
                <figure
                    key={subMenu.id}
                    className='h-full w-full p-5 flex md:flex-row flex-col md:items-end items-start md:justify-between justify-end rounded-3xl overflow-hidden relative gap-5 text-white'
                >
                    <Image
                        data={subMenu.image}
                        alt={subMenu.altText}
                        className='absolute inset-0 -z-1 h-full w-full object-cover brightness-75'
                    />

                    <h4 className='md:text-2xl text-xl max-w-sm'>{subMenu.title}</h4>
                    <Link to={`/collections/${subMenu.handle}`} className='BUTTON1'>Shop Now</Link>
                </figure>
            ))}
        </div>
    );
}





// AllCategories component displays a horizontal scrollable list of collection categories.
export function AllCategories({ allMenus }: { allMenus?: any }) {

    // console.log(`%c${JSON.stringify(allMenus)}`, 'color: red; font-size: 20px;')

    return (
        <div className="w-full flex flex-col gap-5">
            <h2 className="md:text-3xl text-2xl">
                Browse by categories
            </h2>

            <div className="flex flex-row gap-5 overflow-x-scroll HIDDEN_SCROLL pb-5">
                {allMenus?.map((singleMenu: any) => (
                    <Link
                        to={`/collections/${singleMenu?.handle ?? singleMenu?.resource?.handle}`}
                        // WWHY?? Because some menus are some are collection
                        key={singleMenu.title}
                        className="relative group cursor-pointer overflow-hidden rounded-3xl h-40 min-w-50"
                    >
                        <Image
                            data={singleMenu.image}
                            alt={singleMenu?.altText}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Label Badge */}
                        <caption className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-full md:text-sm text-xs font-bold uppercase">
                            {singleMenu.title}
                        </caption>
                    </Link>
                ))}
            </div>
        </div>
    );
};
