import { useEffect, useState } from 'react';
import type { CollectionItemFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import ArrowButton, { SliderButtons, SmallIndexButtons } from './ReUsable/Buttons';
import { AllCategories, TwoGrids } from './CollectionsHero';
import HeaderText, { SmallHeaderText } from './UI/HeaderText';
import Logos from './Logos';




export default function HeroSlider({ mainCollections }: { mainCollections?: CollectionItemFragment[] }) {
    const promotions = [
        "Free shipping on orders over AED 200",
        "New arrivals in Fashion - Up to 30% off",
        "Join our loyalty program for exclusive deals",
        "Flash Sale: 24 hours only on Electronics",
        "Quality guaranteed on all home furniture"
    ];
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    // Slide each 3 seconds
    useEffect(() => {
        if (!mainCollections?.length) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => prev === mainCollections.length - 1 ? 0 : prev + 1);
        }, 5000); // 5 seconds

        return () => clearInterval(intervalId);
    }, [mainCollections?.length, currentIndex]);



    return (
        <section className="relative w-full flex flex-col overflow-hidden">
            {/* Slides */}
            <article className="max-h-150 h-[70vh] relative w-full overflow-hidden md:rounded-t-3xl rounded-t-2xl">
                <div
                    className="relative flex transition-transform duration-700 ease-in-out h-full"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {mainCollections?.map((collection: any) => (
                        <div
                            key={collection.id}
                            className="flex items-end justify-start min-w-full min-h-full "
                        >
                            <figure className="h-full w-full absolute -z-1">
                                <Image
                                    data={collection.image}
                                    alt={collection.handle}
                                    className="w-full h-full object-cover"
                                />
                            </figure>


                            <div className="flex flex-col my-20 justify-end md:px-15 px-10">
                                <div className="text-white">
                                    <h2 className="font-medium mb-3">{collection.title}</h2>
                                    <h6 className="font-semibold text-white mb-2">
                                        {collection.description.slice(0, 70)}...
                                    </h6>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="bg-orange-300 px-3 py-1 rounded">
                                            {collection.location}
                                        </span>
                                        <span className="font-medium">Starts from: AED 10</span>
                                    </div>
                                    <ArrowButton
                                        CC="w-fit"
                                        Href={`/collections/${collection.handle}`}
                                        Text="EXPLORE COLLECTION"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



                {/* Slider Buttons to swipe arrays */}
                <SliderButtons itemsToShow={1} passedArray={mainCollections ?? []} changeIndex={setCurrentIndex} />
                {/* Dots Navigation */}
                <SmallIndexButtons changeIndex={setCurrentIndex} currentIndex={currentIndex} passedArray={mainCollections ?? []} />
            </article>

            <Logos ArrayOfText={promotions} />


            {/* <TwoGrids
                subTwoMenus={mainCollections?.slice(0, 2)}
            /> */}

            <div className='mt-3'>
                <SmallHeaderText
                    HEAD='browse by collection'
                />
                <AllCategories
                    allSubMenus={mainCollections}
                />
            </div>

        </section>
    );
};
