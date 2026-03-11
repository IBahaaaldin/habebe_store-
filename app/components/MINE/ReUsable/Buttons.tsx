import { ArrowRight, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';



export default function ArrowButton({ Href, Text, CC }: { Href?: string; Text?: string, CC?: string; }): JSX.Element {
    return (
        <Link
            to={Href ?? '/'}
            className={`group flex flex-row items-center justify-between md:gap-5 gap-3 md:pl-5 pl-3 pr-1 py-1 rounded-full bg-white  hover:bg-black hover:text-white active:bg-orange-100 text-black duration-300 ${CC}`}
        >
            <span className='text-nowrap'>{Text}</span>

            <div className="bg-black rounded-full p-1 flex items-center justify-center">
                <ArrowRight
                    className="group-hover:translate-x-1 duration-300 md:w-6 md:h-6 w-4 h-4 text-white"
                />
            </div>
        </Link>
    );
};



/// Slider navigation buttons for index-based carousels
export function SliderButtons({
    passedArray = [],
    changeIndex,
    itemsToShow,
}: {
    passedArray: any[];
    changeIndex: (value: number | ((prev: number) => number)) => void;
    itemsToShow: number;
}) {

    // console.log(`%c${JSON.stringify(passedArray)}`, 'color: white; font-size: 20px;')


    // 2. Ensure we don't call .length on undefined
    const arrayLength = passedArray?.length || 0;
    const maxIndex = Math.max(0, arrayLength - itemsToShow);

    const nextSlide = () => {
        changeIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        changeIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // 3. Don't show buttons if there is nothing to slide
    if (arrayLength === 0) return null;


    return (
        <>
            <button
                onClick={prevSlide}
                className="cursor-pointer absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-black/10 text-white backdrop-blur-sm p-2 rounded-r-full hover:bg-black/20 duration-300"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="cursor-pointer absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-black/10 text-white backdrop-blur-sm p-2 rounded-l-full hover:bg-black/20 duration-300"
            >
                <ChevronRight size={24} />
            </button>
        </>
    );
}




/// Used for Skeping the array by X number of pexels
export function SliderButtonsss({
    next,
    prev,
    disableNext,
    disablePrev,
}: {
    next: () => void;
    prev: () => void;
    disableNext: boolean;
    disablePrev: boolean;
}) {
    return (
        <>
            <button
                onClick={prev}
                disabled={disablePrev}
                className={`cursor-pointer group absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-full text-white backdrop-blur-md transition-all duration-300 
        ${disablePrev
                        ? "opacity-0 pointer-events-none"
                        : "bg-black/40 px-2 py-3 hover:bg-black/60 hover:px-4 hover:py-1 active:scale-95"
                    }`}
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={next}
                disabled={disableNext}
                className={`cursor-pointer group absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-l-full text-white backdrop-blur-md transition-all duration-300 
        ${disableNext
                        ? "opacity-0 pointer-events-none"
                        : "bg-black/40 px-2 py-3 hover:bg-black/60 hover:px-4 hover:py-1 active:scale-95"
                    }`}
            >
                <ChevronRight size={24} />
            </button>
        </>
    );
}


export function useHorizontalSlider() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [disableNext, setDisableNext] = useState(false);
    const [disablePrev, setDisablePrev] = useState(true);

    const updateButtons = () => {
        const el = containerRef.current;
        if (!el) return;

        const maxScroll = el.scrollWidth - el.clientWidth;

        setDisablePrev(el.scrollLeft <= 0);
        setDisableNext(el.scrollLeft >= maxScroll - 1);
    };

    const slideNext = (px: number) => {
        const el = containerRef.current;
        if (!el) return;

        el.scrollBy({ left: px, behavior: "smooth" });
    };

    const slidePrev = (px: number) => {
        const el = containerRef.current;
        if (!el) return;

        el.scrollBy({ left: -px, behavior: "smooth" });
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        updateButtons();
        el.addEventListener("scroll", updateButtons);

        return () => el.removeEventListener("scroll", updateButtons);
    }, []);

    return { containerRef, slideNext, slidePrev, disableNext, disablePrev };
}




/// Used for jumping to a specific item in the array
export function SmallIndexButtons({
    passedArray,
    changeIndex,
    currentIndex
}: {
    passedArray: any;
    changeIndex: (value: number | ((prevIndex: number) => number)) => void;
    currentIndex: number
}) {


    const goToSlide = (index: number) => {
        changeIndex(index);
    };


    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {passedArray?.map((collection: any, index: number) => (
                <button
                    key={collection.id}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 border border-black/20 rounded-full transition-all cursor-pointer ${index === currentIndex
                        ? 'bg-orange-300 w-8'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    )
}


export function QuantityButton({ quantity, setQuantity, CC, MCC }: { quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>, CC?: string, MCC?: string }) {


    return (
        <div className={`${MCC || "bg-white"} w-fit flex flex-row gap-3 items-center justify-center  h-fit md:px-2 px-1 md:py-1.5 py-0.5 rounded-full '`}>
            <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                className={`${CC || "bg-zinc-200 hover:bg-zinc-200/50"} rounded-full md:p-1 p-0.5 duration-300 cursor-pointer `}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
                <Minus
                    size={17}
                />
            </button>

            <h4 className="text-black font-medium">{quantity}</h4>

            <button
                type="button"
                aria-label="Increase quantity"
                className={`${CC || "bg-zinc-200 hover:bg-zinc-200/50"} rounded-full md:p-1 p-0.5 duration-300 cursor-pointer `}
                onClick={() => setQuantity(q => q + 1)}
            >
                <Plus
                    size={17}
                />
            </button>
        </div>
    )
}