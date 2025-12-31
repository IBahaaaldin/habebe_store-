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
        <div className='rounded-4xl overflow-hidden px-[3%] mx-auto relative text-white flex flex-col gap-20 justify-center items-start py-20'>
            <article className='max-w-[80%] mx-auto text-center z-10 w-full relative flex flex-col items-center gap-10'>

                <HeroText
                    HEAD={headText}
                    SUBHEAD={subText}
                />


                <ArrowButton
                    CC={"w-fit"}
                    Href={`/collections/${Collections.handle}`}
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
export function TwoGrids({ Collection }: { Collection?: FeaturedCollectionFragment }) {

    const gridItems = [
        {
            imgSrc: "https://images.pexels.com/photos/19710025/pexels-photo-19710025.jpeg",
            altText: "Hero 1",
            title: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            buttonText: "Shop Now"
        },
        {
            imgSrc: "https://images.pexels.com/photos/18536062/pexels-photo-18536062.jpeg",
            altText: "Hero 2",
            title: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            buttonText: "Shop Now"
        }
    ];


    return (
        <div className="grid grid-cols-2 gap-5 items-center h-50 " >
            {gridItems.map((item, index) => (
                <figure
                    key={index}
                    className='h-full w-full p-5 flex md:flex-row flex-col md:items-end items-start md:justify-between justify-end rounded-3xl overflow-hidden relative gap-5 text-white'
                >
                    <img
                        src={item.imgSrc}
                        alt={item.altText} className='absolute inset-0 -z-1 h-full w-full object-cover brightness-75'
                    />


                    <h4 className='md:text-3xl sm:text-2xl text-lg max-w-sm'>{item.title}</h4>
                    <button className='BUTTON1'>{item.buttonText}</button>
                </figure>
            ))}
        </div>
    );
}





// AllCategories component displays a horizontal scrollable list of collection categories.
export function AllCategories({ Collections }: { Collections?: any }) {



    return (
        <div className="w-full flex flex-col gap-5">
            <h2 className="md:text-3xl text-2xl">
                Browse by categories
            </h2>

            <div className="flex flex-row gap-5 overflow-x-scroll HIDDEN_SCROLL pb-5">
                {Collections?.map((singleCollection: any) => (
                    <Link
                        to={`/collections/${singleCollection.handle}`}
                        key={singleCollection.title}
                        className="relative group cursor-pointer overflow-hidden rounded-3xl h-50 min-w-70"
                    >
                        <Image
                            data={singleCollection.image}
                            alt={singleCollection.altText}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Label Badge */}
                        <caption className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-full md:text-sm text-xs font-bold uppercase">
                            {singleCollection.title}
                        </caption>
                    </Link>
                ))}
            </div>
        </div>
    );
};
