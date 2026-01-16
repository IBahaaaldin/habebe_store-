import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';



export default function ArrowButton({ Href, Text, CC }: { Href?: string; Text?: string, CC?: string; }): JSX.Element {
    return (
        <Link
            to={Href ?? '/'}
            className={`flex flex-row items-center justify-between md:gap-5 gap-3 md:pl-5 pl-3 pr-1 py-1 rounded-full bg-white  hover:bg-orange-100 active:bg-orange-100 text-black duration-300 ${CC}`}
        >
            <span className='text-nowrap'>{Text}</span>

            <div className="bg-black rounded-full p-1 flex items-center justify-center">
                <ArrowRight
                    className="md:w-6 md:h-6 w-4 h-4 text-white"
                />
            </div>
        </Link>
    );
};



/// 
export function SliderButtons({
    passedArray,
    changeIndex,
}: {
    passedArray: any;
    changeIndex: (value: number | ((prevIndex: number) => number)) => void;
}) {
    // RIGHT Button
    const nextSlide = () => {
        if (!passedArray?.length) return;
        changeIndex((prevIndex) => (prevIndex + 1) % passedArray.length);
    };

    // LEFT Button
    const prevSlide = () => {
        if (!passedArray?.length) return;
        changeIndex((prevIndex) => (prevIndex - 1 + passedArray.length) % passedArray.length);
    };

    return (
        <>
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="cursor-pointer absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-zinc-100 shadow hover:bg-white duration-300 text-black md:p-3 p-2 rounded-full "
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="cursor-pointer absolute -right-1 top-1/2 -translate-y-1/2 z-10 bg-zinc-100 shadow hover:bg-bg-white duration-300 text-black md:p-3 p-2 rounded-full"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>
        </>
    );
}



/// 
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