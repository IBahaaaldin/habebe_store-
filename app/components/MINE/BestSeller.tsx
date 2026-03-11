import { Suspense, useEffect, useRef, useState } from 'react'
import { Await } from 'react-router'
import { ProductItem } from '../ProductItem'
import ArrowButton, { SliderButtons } from './ReUsable/Buttons'
import LoadingSpinner from './ReUsable/LoadingSpinner'
import HeaderText, { SmallHeaderText } from './UI/HeaderText'

export default function BestSeller({
    collectionTitle,
    Handle,
    products
}: {
    collectionTitle?: string,
    Handle?: string,
    products: any
}) {
    const [mounted, setMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [itemsToShow, setItemsToShow] = useState(1); // Default for SSR

    useEffect(() => {
        setMounted(true);

        const updateItems = () => {
            const width = window.innerWidth;
            if (width >= 1280) setItemsToShow(5);      // xl
            else if (width >= 1024) setItemsToShow(4); // lg
            else if (width >= 768) setItemsToShow(3);  // md
            else setItemsToShow(2);                    // sm/mobile
        };

        updateItems(); // Run on mount
        window.addEventListener('resize', updateItems);
        return () => window.removeEventListener('resize', updateItems);
    }, []);

    console.log(`%c${JSON.stringify(currentIndex, null, 3)}`, 'color: white; font-size: 20px;')

    return (
        <div className='flex flex-col justify-between w-full'>
            <HeaderText
                HEAD={`Top Picks from ${collectionTitle}`}
            />

            <div className='border py-3 md:rounded-3xl rounded-2xl relative overflow-hidden'>
                <Suspense fallback={<LoadingSpinner />}>
                    <Await resolve={products}>
                        {(response) => {
                            const data = response?.nodes?.slice(0, 10) || [];

                            // Handle the "Empty" state
                            if (data.length === 0) {
                                return <LoadingSpinner />;
                            }

                            return (
                                <div className="px-3">
                                    <div
                                        className="flex transition-transform duration-500 ease-out"
                                        style={{
                                            transform: mounted
                                                ? `translateX(-${currentIndex * (100 / itemsToShow)}%)`
                                                : 'translateX(0%)' // Static transform for SSR
                                        }}
                                    >
                                        {data.map((product: any) => (
                                            <div
                                                style={{
                                                    minWidth: mounted
                                                        ? `${100 / itemsToShow}%`
                                                        : `${100 / 2}%` // Default 2 items for SSR
                                                }}
                                                key={product?.id}
                                                className={`px-1`}
                                            >
                                                <ProductItem product={product} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Only render buttons after mounting */}
                                    {mounted && (
                                        <SliderButtons
                                            itemsToShow={itemsToShow}
                                            changeIndex={setCurrentIndex}
                                            passedArray={data}
                                        />
                                    )}
                                </div>
                            );
                        }}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}