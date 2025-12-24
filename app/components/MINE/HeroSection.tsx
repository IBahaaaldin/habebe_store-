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




import { motion } from "framer-motion"
import { Image } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment } from 'storefrontapi.generated';



const HeroSection = ({ collection, Title, Description, HeroImg }: { collection: FeaturedCollectionFragment, Title?: string, Description?: string, HeroImg?: string; }) => {


    const headText = Title ? Title : "FIND CLOTHES THAT MATCHES YOUR STYLE";
    const subText = Description ? Description : "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.";

    return (
        <div className='max-w-[1750px] rounded-[0px] overflow-hidden w-full mx-auto relative text-white z-1 min-w-full px-[5%] flex flex-col gap-20 justify-center items-start md:min-h-screen py-20'>
            {/* bg-[#664343]  */}
            <article className='max-w-[70%] text-center z-10 w-full  relative flex flex-col gap-10'>
                {/* <Messages /> */}


                <div className='text-start z-10 relative flex flex-col gap-5  items-start justify-between items-e'>

                    <h1
                        className='w-full flex flex-row flex-wrap gap-2 text-wrap font-bold'
                    >
                        {headText.split(" ").map((word, index) => (
                            <span
                                key={index}
                                // **This is the container/window that clips the animation**
                                className='inline-block overflow-hidden uppercase mr-3 lg:text-7xl md:text-5xl text-4xl'
                            >
                                <motion.span
                                    // **Start hidden below the 'window'**
                                    initial={{ y: '100%' }}
                                    // **Slide up into final position**
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: index * 0.06, ease: [0.165, 0.84, 0.44, 1] }} // Added a nice ease
                                    className='inline-block' // Ensure it's a block element for predictable y-translation
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h1>




                    <h3 className="lg:text-lg sm:text-md text-sm flex flex-row w-full opacity-50">
                        {subText}
                    </h3>
                </div>


                {/* <Messages /> */}
                <a href={`/collections/${collection.handle}`}>
                    <button className='button1'>
                        Shop Now
                    </button>
                </a>
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



export default HeroSection;