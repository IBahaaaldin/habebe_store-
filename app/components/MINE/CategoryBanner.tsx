import React from 'react';
import ArrowButton from './ReUsable/Buttons';
import { Image } from '@shopify/hydrogen';
import HeaderText from './UI/HeaderText';



const categories = [
    {
        title: "Men",
        subtitle: "Bold & Timeless — Premium apparel designed for the modern man.",
        image: "https://images.pexels.com/photos/4611700/pexels-photo-4611700.jpeg",
        handle: "men",
    },
    {
        title: "Women",
        subtitle: "Elegant & Modern — Sophisticated pieces that blend contemporary trends.",
        image: "https://images.pexels.com/photos/7202897/pexels-photo-7202897.jpeg",
        handle: "women",
    },
    {
        title: "Kids",
        subtitle: "Playful & Colorful — Durable outfits that keep up with every adventure.",
        image: "https://images.pexels.com/photos/6261908/pexels-photo-6261908.jpeg",
        handle: "kids",
    },
];



function CategoryBanner() {
    return (
        <div className="flex flex-col gap-5 text-black">
            {categories.map((category, index) => {
                const isOdd = index % 2 === 0; // 0,2,4... → left image

                return (
                    <div
                        key={category.title}
                        className="grid md:grid-cols-4 gap-3 md:gap-5 items-center overflow-hidden backdrop-blur-sm transition-all duration-500"
                    >
                        {/* Image - Spans 3 columns */}
                        <div className={`relative md:h-60 overflow-hidden  md:col-span-3 
                            ${isOdd ? 'md:order-1' : 'md:order-2'}
                            `}>
                            <Image
                                src={category.image}
                                sizes='75vw' // Updated for better optimization
                                alt={category.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            {isOdd ? (
                                <div className="absolute inset-0 bg-linear-to-l from-white via-transparent to-black/50" />
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-black/50" />
                            )}
                        </div>

                        {/* Text content - Spans 1 column */}
                        <div className={`flex flex-col gap-2 text-center md:text-left md:col-span-1
            ${isOdd ? 'md:order-2' : 'md:order-1'}`}>
                            <HeaderText HEAD={category.title} SUBHEAD={category.subtitle} />
                            <ArrowButton
                                Text="Explore"
                                CC="w-fit border"
                                Href={`/collections/${category.handle}`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CategoryBanner;