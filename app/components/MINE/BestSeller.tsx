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
                        <div
                            className='bg-red-900 flex flex-row gap-3 px-5 overflow-x-scroll HIDDEN_SCROLL justify-start transition-transform duration-700 '
                            style={{
                                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                            }}
                        >
                            {response
                                ? response?.nodes?.slice(0, 10)?.map((product: any) => (
                                    <div
                                        className='min-w-[30%] px-1'
                                    >
                                        <ProductItem
                                            key={product?.id}
                                            product={product}
                                        />
                                    </div>
                                ))
                                : null}
                        </div>
                    )}
                </Await>
            </Suspense>
        </div>)
}
