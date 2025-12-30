// /* eslint-disable jsx-a11y/img-redundant-alt */
// // import { Button } from "./ui/button";

// import { Image } from "@shopify/hydrogen";

// const HeroSection = () => {



//     const headerText = "FIND CLOTHES THAT MATCHES YOUR STYLE";
//     const subheaderText = "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.";



//     return (
//         <section className="relative bg-red-900">
//             <div className="section-padding py-10 md:py-0">
//                 <div className="grid lg:grid-cols-2 gap-8 items-center">
//                     {/* Text Content */}
//                     <div className="space-y-6 py-8 lg:py-16">
//                         <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
//                             {headerText}
//                         </h1>
//                         <p className="text-muted-foreground max-w-md text-sm md:text-base">
//                             {subheaderText}
//                         </p>
//                         <button>
//                             Shop Now
//                         </button>

//                         {/* Stats */}
//                         <div className="flex flex-wrap gap-8 pt-6">
//                             <div>
//                                 <p className="text-2xl md:text-3xl font-bold">200+</p>
//                                 <p className="text-xs md:text-sm text-muted-foreground">International Brands</p>
//                             </div>
//                             <div className="border-l border-border pl-8">
//                                 <p className="text-2xl md:text-3xl font-bold">2,000+</p>
//                                 <p className="text-xs md:text-sm text-muted-foreground">High-Quality Products</p>
//                             </div>
//                             <div className="border-l border-border pl-8">
//                                 <p className="text-2xl md:text-3xl font-bold">30,000+</p>
//                                 <p className="text-xs md:text-sm text-muted-foreground">Happy Customers</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Hero Image Placeholder */}
//                     {/* <div className="w-full h-full bg-gradient-to-t from-muted to-secondary rounded-t-3xl flex items-center justify-center">
//                             <div className="text-center text-muted-foreground">
//                                 <div className="w-48 h-64 md:w-64 md:h-80 bg-muted rounded-2xl mx-auto flex items-center justify-center">
//                                     <span className="text-sm">Hero Image</span>
//                                 </div>
//                             </div>
//                         </div> */}


//                     {/* Decorative Stars */}
//                     <div className="absolute top-10 right-10 text-4xl">✦</div>
//                     <div className="absolute bottom-32 left-10 text-2xl">✦</div>
//                 </div>
//             </div>


//             <img src="https://images.pexels.com/photos/29531037/pexels-photo-29531037.jpeg" alt="Hero Image" className="absolute w-full h-full object-cover rounded-t-3xl" />
//         </section>
//     );
// };

// export default HeroSection;




import { Image } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment } from 'storefrontapi.generated';
import HeroText from "./UI/HeroText";
import ArrowButton from './ReUsable/Buttons';



export default function HeroSection({ collection, Title, Description, HeroImg }: { collection: FeaturedCollectionFragment, Title?: string, Description?: string, HeroImg?: string; }): JSX.Element {


    const images = ["https://placehold.co/600x400/e2e8f0/1e293b?text=Image+1", "https://placehold.co/600x400/e2e8f0/1e293b?text=Image+2"]

    const headText = Title ? Title : "FIND CLOTHES THAT MATCHES YOUR STYLE";
    const subText = Description ? Description : "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.";



    return (
        <div className='rounded-4xl overflow-hidden px-[3%] mx-auto relative text-white flex flex-col gap-20 justify-center items-start py-20'>
            <article className='max-w-[80%] mx-auto text-center z-10 w-full relative flex flex-col items-center gap-10'>

                <HeroText
                    HEAD={headText}
                    SUBHEAD={subText}
                />


                <ArrowButton
                    CC={"w-fit"}
                    Href={`/collections/${collection.handle}`}
                    Text="EXPLORE COLLECTION"
                />
            </article>



            {/* ABSOLUTE SECTION */}
            <Image
                src={HeroImg ? HeroImg : collection?.image?.url ?? ''}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover brightness-70"
            />
        </div>
    );
};




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


                    <h3 className='md:text-3xl text-2xl max-w-sm'>{item.title}</h3>
                    <button className='BUTTON1'>{item.buttonText}</button>
                </figure>
            ))}
        </div>
    );
}





import { Link } from 'react-router';

const categories = [
    {
        name: 'SHOES',
        image: 'https://images.pexels.com/photos/35119489/pexels-photo-35119489.jpeg',
    },
    {
        name: 'BRASH', // Preserved the typo from your image
        image: 'https://images.pexels.com/photos/35119489/pexels-photo-35119489.jpeg',
    },
    {
        name: 'BAG',
        image: 'https://images.pexels.com/photos/35119489/pexels-photo-35119489.jpeg',
    },
    {
        name: 'T-SHIRT',
        image: 'https://images.pexels.com/photos/35119489/pexels-photo-35119489.jpeg',
    },
];



export function AllCategories({ Collection }: { Collection?: FeaturedCollectionFragment }) {



    return (
        <div className="w-full flex flex-col gap-5">
            <h2 className="md:text-3xl text-2xl">
                Browse by categories
            </h2>

            <div className="flex flex-row gap-5 overflow-x-scroll HIDDEN_SCROLL pb-5">
                {categories.map((category) => (
                    <Link
                        to={`/collections/${category.name.toLowerCase()}`}
                        key={category.name}
                        className="relative group cursor-pointer overflow-hidden rounded-3xl h-50 min-w-70"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Label Badge */}
                        <caption className="absolute bottom-5 left-5 bg-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                            {category.name}
                        </caption>
                    </Link>
                ))}
            </div>
        </div>
    );
};
