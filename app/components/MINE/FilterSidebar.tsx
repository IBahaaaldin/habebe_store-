import { col } from "framer-motion/client";
import { ArrowBigDown, ChevronDown, ChevronDownIcon, ChevronUp } from "lucide-react";
import { useState } from "react";



// This single component handles EVERY filter type
export default function FilterSidebar({ AvailableSize, AvailableColor, AvailablePrice }: any) {


    // const MinPrice = Math.min(...AvailablePrice);
    // const MaxPrice = Math.max(...AvailablePrice);


    // console.log(`%c${JSON.stringify(AvailableSize)}`, 'color: red; font-size: 20px;')
    // console.log(`%c${JSON.stringify(AvailableColor)}`, 'color: red; font-size: 20px;')
    // console.log(`%c${JSON.stringify(AvailablePrice)}`, 'color: red; font-size: 20px;')

    // const name = "Ahmed"
    // const size = Array.isArray(AvailableSize) ? AvailableSize : ['sm', 'md', 'lg', 'xl', '2xl', '3xl'];
    // const color = Array.isArray(AvailableColor) ? AvailableColor : ['red', 'blue', 'green', 'black', 'white']; // default colors
    // const price = AvailablePrice ? AvailablePrice : [0, 1000]; // default price if missing




    // FakeData

    const [minPrice, setMinPrice] = useState<number>(0);

    const price = [0, 1000];
    const color = [
        'red',
        'blue',
        'green',
        'black',
        'white',
        'pink',
        'purple',
        'brown',
        'gray',
    ];
    const size = [
        'small',
        'medium',
        'large',
        'x-large',
        '2x-large',
        '3x-large',
    ];
    const style = [
        'casual',
        'sporty',
        'formal',
        'streetwear',
        'bohemian',
        'vintage',
        'luxury',
        'minimalist',
        'edgy',
    ];



    return (
        <div className="sticky self-start max-w-sm flex flex-col gap-3 border border-zinc-300 md:rounded-2xl rounded-xl p-5 h-fit">
            <div className="flex flex-col gap-3">
                <div className="flex flex-row w-full justify-between border-b border-zinc-300 pb-3">
                    <h5 className="text-xl font-medium ">Size</h5>
                    {/* <ChevronDown /> */}
                    <ChevronUp />
                </div>


                <ul className="flex flex-row gap-2 flex-wrap">
                    {size.map((item: string) => (
                        <li
                            key={item}
                            className="cursor-pointer flex w-fit px-5 py-3 bg-zinc-100 rounded-full hover:bg-black hover:text-white duration-300"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>




            {/* COLOR */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-row w-full justify-between border-b border-zinc-300 pb-3">
                    <h5 className="text-xl font-medium ">Color</h5>
                    {/* <ChevronDown /> */}
                    <ChevronUp />
                </div>


                <ul className="flex flex-row gap-2 flex-wrap">
                    {color.map((item: string) => (
                        <li
                            key={item}
                            className={`cursor-pointer w-10 h-10 flex bg-zinc-100 rounded-full hover:bg-black hover:text-white duration-300`}
                            style={{
                                backgroundColor: item
                            }}
                        />
                    ))}
                </ul>
            </div>



            <div className="flex flex-col gap-3">
                <div className="flex flex-row w-full justify-between border-b border-zinc-300 pb-3">
                    <h5 className="text-xl font-medium ">Price</h5>
                    <ChevronUp />
                </div>


                <div className="flex flex-row flex-wrap gap-5 justify-between">
                    <input
                        className="INPUT "
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <input
                        className="INPUT "
                        placeholder="Max Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                </div>
            </div>



            <div className="flex flex-col gap-3">
                <div className="flex flex-row w-full justify-between border-b border-zinc-300 pb-3">
                    <h5 className="text-xl font-medium ">Dress Style</h5>
                    {/* <ChevronDown /> */}
                    <ChevronUp />
                </div>


                <ul className="flex flex-row gap-2 flex-wrap">
                    {style.map((item: string) => (
                        <li
                            key={item}
                            className="cursor-pointer flex w-fit px-5 py-3 bg-zinc-100 rounded-full hover:bg-black hover:text-white duration-300"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );
};