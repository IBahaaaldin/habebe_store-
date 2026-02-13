import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';
import ArrowButton from './ReUsable/Buttons';
import HeaderText, { SmallHeaderText } from './UI/HeaderText';




export function HomeGardenFurnitureBanner({ bannerArray }: { bannerArray: any }) {

    const products = [
        { id: 1, name: "Beige Sofa", price: 1570, oldPrice: 2000, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg", wide: true },
        { id: 2, name: "Gray Armchair", price: 120, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg" },
        { id: 3, name: "Leather Chair", price: 230, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg" },
        { id: 4, name: "Wooden chair", price: 85, oldPrice: 120, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg", discount: "-30" },
        { id: 5, name: "Yellow Sofa", price: 1250, oldPrice: 1600, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg", wide: true, discount: "-30" },
        { id: 6, name: "Ward", price: 620, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg" },
    ];



    return (
        <section className="grid grid-cols-4 gap-3">
            {products.map((product) => (
                <div key={product.id} className={`relative md:h-70 h-50 overflow-hidden border rounded-2xl flex flex-col justify-end ${product.wide ? 'col-span-2' : 'col-span-1'}`}>
                    {/* Product Image */}
                    <Image
                        src={product.img}
                        alt={product.name}
                        className="absolute -z-1 h-full w-fullw-full object-cover"
                    />


                    {product.wide &&
                        <span className='font-medium absolute md:top-5 top-3 md:left-5 left-3 bg-green-400 px-2 py-1 rounded-xl text-white shadow'>
                            Best Seller
                        </span>
                    }



                    {/* Footer Info */}
                    <article className="md:p-5 p-3 flex flex-col gap-3 justify-between items-start">
                        <div className=''>
                            {/* <h5 className='font-medium' >{product.name}</h5> */}
                            <div className="flex gap-2 items-center">
                                <span className="font-medium">${product.price}</span>
                                {product.oldPrice && <span className="text-zinc-400 line-through">${product.oldPrice}</span>}
                                {/* <Prices price={`${product.price}`} isBig={false} /> */}
                            </div>
                        </div>

                        {product.wide &&
                            <ArrowButton
                                Text='Shop Now'
                                CC='w-fit right-4 bottom-4'
                                Href='/collections/home-garden-furniture'
                            />
                        }
                    </article>
                </div>
            ))}
        </section>
    );
}



export function PetsBanner({ bannerArray }: { bannerArray: any }) {

    console.log(`%c${JSON.stringify(bannerArray, null, 3)}`, 'color: white; font-size: 20px;')
    // if (!Array.isArray(bannerArray && bannerArray.length > 0)) {
    //     return null;
    // }


    return (
        <section className="text-black flex flex-col sm:flex-col gap-2">
            {/* LEFT */}

            <div className="w-full flex flex-row gap-2 md:h-70 h-50">
                {bannerArray.slice(0, 2).map((banner: any, index: number) => (
                    <Link
                        key={banner.id}
                        to={`/collections/${banner.handle}`}
                        aria-label={banner.handle}
                        className={`relative md:p-10 p-5 md:rounded-3xl rounded-2xl md:h-full overflow-hidden 
                            ${index % 2 === 0 ? "w-2/3" : "w-1/3"}
                        `}
                    >
                        <Image
                            data={banner?.image}
                            alt={banner.handle}
                            className="-z-1 absolute inset-0 object-cover md:rounded-3xl rounded-2xl w-full h-full hover:scale-105  duration-500"
                        />

                        <SmallHeaderText
                            HEAD='Watch Wearable Device'
                        />
                        {index % 2 === 0 &&
                            <ArrowButton
                                Text='Show Now'
                                CC='w-fit'
                                Href='/collections/electronics'
                            />
                        }
                    </Link>
                ))}
            </div>


            {/* /// RIGHT */}
            <div className="w-full flex flex-row gap-2 md:h-50 h-30">
                {bannerArray.slice(2, 5).map((banner: any, index: number) => (
                    <Link
                        key={banner.id}
                        to={`/collections/${banner.handle}`}
                        aria-label={banner.handle}
                        className={`relative md:p-7 p-5 md:rounded-3xl rounded-2xl md:h-full overflow-hidden w-1/3
                        `}
                    >


                        <SmallHeaderText
                            HEAD='Cat & Dog'
                        />

                        <Image
                            data={banner?.image}
                            alt={banner.handle}
                            className="-z-1 absolute inset-0 object-cover md:rounded-3xl rounded-2xl h-full w-full hover:scale-105 duration-500"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};





const products = [
    {
        name: "Hero Camera",
        image: "https://images.unsplash.com/photo-1588109273901-3104e2b0a6d2?w=400",
        gradient: "from-gray-900 to-black"
    },
    {
        name: "Apple iPad",
        image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400",
        gradient: "from-blue-900 to-indigo-900"
    },
    {
        name: "Smart Watch",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
        gradient: "from-orange-900 to-amber-900"
    }
];


export function ElectronicsBanner({ bannerArray }: { bannerArray: any }) {


    return (
        <div className="flex flex-col gap-3 ">
            {/* Main Watch Section */}
            <div className="relative flex md:flex-row flex-col gap-3 h-full ">
                <article className="text-white relative md:p-10 p-5 overflow-hidden md:h-70 h-50 md:w-2/3 w-full bg-center">

                    <Image
                        src='https://images.pexels.com/photos/792345/pexels-photo-792345.jpeg'
                        className='absolute -z-1 inset-0 w-full h-full object-cover md:rounded-3xl rounded-2xl object-center'
                    />

                    <HeaderText
                        HEAD='Watch Wearable Device'
                        SUBHEAD='Which can vary depending on the brand and model electronic device.'
                    />

                    <ArrowButton
                        Text='Show Now'
                        CC='w-fit'
                        Href='/collections/electronics'
                    />
                </article>


                <article className="flex md:flex-col flex-row md:h-70 h-30 min-h-full md:w-1/3 w-full gap-3">
                    {bannerArray.slice(0, 2).map((banner: any, index: number) => (
                        <div
                            key={index}
                            className={`h-full text-black relative overflow-hidden w-full p-5 text-center`}
                        >
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                className="absolute -z-1 inset-0 w-full h-full object-cover md:rounded-3xl rounded-2xl hover:scale-105 duration-300"
                            />
                            <HeaderText
                                HEAD={banner.title}
                                SUBHEAD='Up TO 50% OFF'
                            />
                        </div>
                    ))}
                </article>
            </div>



            {/* Bottom Products - Mapped */}
            <article className="grid grid-cols-3 gap-3">
                {bannerArray.slice(2, 5).map((banner: any, index: any) => (
                    <div
                        key={index}
                        className={`text-white relative md:h-50 h-30 overflow-hidden p-5 text-center flex flex-col justify-between`}
                    >
                        <Image
                            src={banner.image}
                            alt={banner.title}
                            className="absolute -z-1 inset-0 w-full h-full object-cover md:rounded-3xl rounded-2xl hover:scale-105 duration-300"
                        />
                        <SmallHeaderText
                            HEAD={banner.title}
                            SUBHEAD='Starting at $299'
                        />
                    </div>
                ))}
            </article>
        </div>
    );
};

