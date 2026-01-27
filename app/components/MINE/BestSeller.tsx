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
    console.log(`%c${JSON.stringify(currentIndex, null, 3)}`, 'color: white; font-size: 20px;')


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






            <div className='relative overflow-hidden'>
                <Suspense fallback={<LoadingSpinner />}>
                    <Await resolve={products}>
                        {(response) => (
                            <div
                                className='bg-red-900 flex flex-row gap-3 px-5 justify-start transition-transform duration-700 '
                                style={{
                                    transform: `translateX(-${currentIndex * 280}px)`,
                                    // transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                                }}
                            >
                                {response
                                    ? response?.nodes?.slice(0, 10)?.map((product: any) => (
                                        <div
                                            key={product?.id}
                                            className='min-w-70'
                                        >
                                            <ProductItem
                                                product={product}
                                            />
                                        </div>
                                    ))
                                    : null}
                            </div>
                        )}
                    </Await>
                </Suspense>

                <SliderButtons changeIndex={setCurrentIndex} passedArray={products?.response?.nodes} />
            </div>
        </div>
    )
}
