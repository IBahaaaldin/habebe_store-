import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { useRef, useState, useCallback } from 'react';



const categories = [
    {
        title: "Health & Beauty",
        handle: "health-beauty",
        image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg",
    },
    {
        title: "Wedding & Events",
        handle: "wedding-events",
        image: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg",
    },
    {
        title: "Sports",
        handle: "sports",
        image: "https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg",
    },
    {
        title: "Sun Care",
        handle: "sun-care",
        image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
    },
    {
        title: "Couples & Parents",
        handle: "couples-parents",
        image: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg",
    },
    {
        title: "Babies & Parents",
        handle: "babies-parents",
        image: "https://images.pexels.com/photos/3933275/pexels-photo-3933275.jpeg",
    },
    {
        title: "Anime & Figures",
        handle: "anime-figures",
        image: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
        title: "Travel & Outdoor",
        handle: "travel-outdoor",
        image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
    },
];



function CategoryBanner({ bannerArray }: { bannerArray?: any }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        // card width = total scroll width divided by number of cards
        const cardWidth = el.scrollWidth / categories.length;
        const index = Math.round(el.scrollLeft / cardWidth);
        setActiveIndex(Math.min(index, categories.length - 1));
    }, []);

    const scrollTo = (index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.scrollWidth / categories.length;
        el.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        setActiveIndex(index);
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Mobile: horizontal snap slider  |  Desktop: 2-row 4-col grid */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="
                    flex flex-row gap-3 overflow-x-scroll pb-2
                    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                    scroll-smooth [scroll-snap-type:x_mandatory]
                    md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:gap-4
                    md:[scroll-snap-type:none]
                "
            >
                {categories.map((category) => (
                    <Link
                        to={`/collections/${category.handle}`}
                        key={category.title}
                        className="
                            relative flex-shrink-0 [scroll-snap-align:start]
                            w-[47vw] h-48
                            md:w-auto md:h-52
                            rounded-2xl md:rounded-3xl overflow-hidden group
                        "
                    >
                        <Image
                            src={category.image}
                            alt={category.title}
                            sizes="(min-width: 768px) 25vw, 47vw"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm md:text-base leading-tight">
                            {category.title}
                        </h3>
                    </Link>
                ))}
            </div>

            {/* Dots — mobile only */}
            <div className="flex md:hidden justify-center items-center gap-1.5">
                {categories.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            i === activeIndex
                                ? 'w-5 bg-orange-400'
                                : 'w-2 bg-zinc-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategoryBanner;
