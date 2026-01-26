import { Suspense, useRef, useState } from 'react'
import { Await } from 'react-router'
import { ProductItem } from '../ProductItem'
import ArrowButton, { SliderButtons } from './ReUsable/Buttons'
import LoadingSpinner from './ReUsable/LoadingSpinner'
import { SmallHeaderText } from './UI/HeaderText'



export default function BestSeller({
    collectionTitle,
    Handle,
    products
}: {
    collectionTitle?: string,
    Handle?: string,
    products: any
}) {


    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const productRef = useRef<HTMLDivElement>(null);

    const getOffset = () => {
        if (productRef.current) {
            const width = productRef.current.offsetWidth;
            const gap = 12; // This matches your gap-3 (3 * 4px)
            return currentIndex * (width + gap);
        }
        return 0;
    };

    return (
        <div className='flex lg:flex-row flex-col justify-between w-full gap-10 p-5 border md:rounded-3xl rounded-2xl'>


            <article className='flex flex-col gap-3 justify-between'>
                <SmallHeaderText
                    HEAD={<>Top Picks from <b>{collectionTitle}</b></>}
                    SUBHEAD={<>Explore our curated selection of top picks from the <b>{collectionTitle}</b> collection.</>}
                />
                <ArrowButton
                    Text='Explore Collection'
                    CC='w-fit border'
                    Href={`/collections/${Handle}`}
                />
            </article>


            <Suspense fallback={<LoadingSpinner />}>
                <Await resolve={products}>
                    {(response) => (
                        <div className="relative ease-in-out transition-transform duration-700 flex flex-row items-end justify-start gap-3 overflow-x-scroll HIDDEN_SCROLL bg-red-900">
                            {response
                                ? response?.nodes?.slice(0, 10)?.map((product: any) => (
                                    <div
                                        className='min-w-60'
                                        // style={{
                                        //     transform: `translateX(-${currentIndex * 100}%)`,
                                        // }}
                                        style={{
                                            transform: `translateX(-${currentIndex * 100}%)`,
                                            transition: currentIndex < 0 || currentIndex >= 10
                                                ? 'none'
                                                : 'transform 700ms ease-in-out',
                                        }}
                                    >

                                        <ProductItem

                                            key={product?.id}

                                            product={product}

                                        />



                                    </div>

                                ))

                                : null}

                            <SliderButtons changeIndex={setCurrentIndex} passedArray={response?.nodes?.slice(0, 10)} />

                        </div>
                    )}
                </Await>
            </Suspense>
        </div>)
}
