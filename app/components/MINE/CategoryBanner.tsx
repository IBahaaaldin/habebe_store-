import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';



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
    return (
        /* Mobile: single-row horizontal slider  |  Desktop: 2-row grid (4 cols → 4+3) */
        <div className="
            flex flex-row gap-3 overflow-x-scroll ROW_SCROLL pb-2
            md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:gap-4
        ">
            {categories.map((category) => (
                <Link
                    to={`/collections/${category.handle}`}
                    key={category.title}
                    className="
                        relative flex-shrink-0 min-w-44 h-40
                        md:min-w-0 md:h-44
                        rounded-2xl md:rounded-3xl overflow-hidden group
                    "
                >
                    <Image
                        src={category.image}
                        alt={category.title}
                        sizes="(min-width: 768px) 25vw, 176px"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm md:text-base leading-tight">
                        {category.title}
                    </h3>
                </Link>
            ))}
        </div>
    );
}

export default CategoryBanner;
