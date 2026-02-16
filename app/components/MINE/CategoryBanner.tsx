import React from 'react';
import ArrowButton from './ReUsable/Buttons';
import { Image } from '@shopify/hydrogen';
import HeaderText from './UI/HeaderText';
import { Link } from 'react-router';



const categories = [
    {
        title: "Men",
        subtitle: "Bold & Timeless — Premium apparel designed for the modern man.",
        image: "https://images.pexels.com/photos/4611700/pexels-photo-4611700.jpeg",
        handle: "men-shirts",
    },
    {
        title: "Women",
        subtitle: "Elegant & Modern — Sophisticated pieces that blend contemporary trends.",
        image: "https://images.pexels.com/photos/7202897/pexels-photo-7202897.jpeg",
        handle: "women-pants",
    },
    {
        title: "Kids",
        subtitle: "Playful & Colorful — Durable outfits that keep up with every adventure.",
        image: "https://images.pexels.com/photos/6261908/pexels-photo-6261908.jpeg",
        handle: "kids-toys",
    },
];



function CategoryBanner({ bannerArray }: { bannerArray?: any }) {


    return (
        <div className="flex flex-col md:gap-5 gap-3 text-black">
            {categories.map((category, index) => {
                const isOdd = index % 2 === 0; // 0,2,4... → left image

                return (
                    <Link
                        to={`/collections/${category.handle}`}
                        key={category.title}
                        className="grid md:grid-cols-4 gap-3 md:gap-5 items-center overflow-hidden backdrop-blur-sm transition-all duration-500"
                    >
                        {/* Image - Spans 3 columns */}
                        <div className={`group relative w-full md:h-60 h-50 overflow-hidden col-span-4 md:rounded-3xl rounded-2xl
                            `}>
                            <Image
                                src={category.image}
                                sizes='75vw' // Updated for better optimization
                                alt={category.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {isOdd ? (
                                <div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-black/50" />
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-l from-white via-transparent to-black/50" />
                            )}
                        </div>

                        {/* Text content - Spans 1 column */}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 md:max-w-[40%] max-w-[50%] flex flex-col gap-2 text-center md:text-left md:col-span-1
                            ${isOdd ? 'left-10' : 'right-10'}`}>
                            <h3 className="font-bold ">{category.title}</h3>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default CategoryBanner;