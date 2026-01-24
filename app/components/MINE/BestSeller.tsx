import { Suspense } from 'react'
import { Await } from 'react-router'
import { ProductItem } from '../ProductItem'
import ArrowButton from './ReUsable/Buttons'
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
    return (
        <article className='flex lg:flex-row flex-col justify-between w-full gap-10 p-5 bg-zinc-200 md:rounded-3xl rounded-2xl'>


            <div className='flex flex-col gap-3 justify-between'>

                <SmallHeaderText
                    HEAD={<>Top Picks from <b>{collectionTitle}</b></>}
                    SUBHEAD={<>Explore our curated selection of top picks from the <b>{collectionTitle}</b> collection.</>}
                />
                <ArrowButton
                    Text='Explore Collection'
                    CC='w-fit'
                    Href={`/collections/${Handle}`}
                />
            </div>


            <Suspense fallback={<LoadingSpinner />}>
                <Await resolve={products}>
                    {(response) => (
                        <div className="flex flex-row gap-3 overflow-x-scroll HIDDEN_SCROLL">
                            {response
                                ? response?.nodes?.slice(0, 20)?.map((product: any) => (

                                    <ProductItem
                                        key={product?.id}
                                        product={product}
                                    />

                                ))
                                : null}
                        </div>
                    )}
                </Await>
            </Suspense>
        </article>)
}
