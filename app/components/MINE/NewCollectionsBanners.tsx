import { ArrowBigRight, ArrowRight, ShoppingCart } from 'lucide-react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';
import ArrowButton from './ReUsable/Buttons';
import HeaderText, { SmallHeaderText } from './UI/HeaderText';




export function HomeGardenFurnitureBanner() {

    const products = [
        { id: 1, name: "Beige Sofa", price: 1570, oldPrice: 2000, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg", wide: true },
        { id: 2, name: "Gray Armchair", price: 120, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg" },
        { id: 3, name: "Leather Chair", price: 230, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg" },
        { id: 4, name: "Wooden Armchair", price: 85, oldPrice: 120, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg", discount: "-30" },
        { id: 5, name: "Yellow Sofa", price: 1250, oldPrice: 1600, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg", wide: true, discount: "-30" },
        { id: 6, name: "Wardrobe", price: 620, img: "https://images.pexels.com/photos/6636021/pexels-photo-6636021.jpeg" },
    ];



    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product) => (
                <div key={product.id} className={`relative md:h-70 h-40 overflow-hidden border rounded-2xl flex flex-col justify-end ${product.wide ? 'md:col-span-2' : 'col-span-1'}`}>
                    {/* Product Image */}
                    <Image
                        src={product.img}
                        alt={product.name}
                        className="absolute -z-1 h-full w-fullw-full object-cover"
                    />


                    {product.wide &&
                        <span className='font-medium absolute top-5 left-5 bg-green-400 px-2 py-1 rounded-xl text-white shadow'>
                            Best Seller
                        </span>
                    }



                    {/* Footer Info */}
                    <article className="p-5 flex gap-2 justify-between items-end">
                        <div>
                            <h4 className='font-medium' >{product.name}</h4>
                            <div className="flex gap-2 items-center">
                                <span className="font-medium">${product.price}</span>
                                {product.oldPrice && <span className="text-gray-400 line-through text-sm">${product.oldPrice}</span>}
                            </div>
                        </div>





                        <button
                            className={`cursor-pointer
                            group absolute right-4 bottom-4 
                            flex items-center
                            px-3 py-2 rounded-full
                            bg-orange-400 text-white
                            transition-all duration-300 ease-out
                            hover:bg-orange-500
                        `}
                        >
                            <span className=" text-nowrap font-medium
                            opacity-0 max-w-0 
                            group-hover:opacity-100 group-hover:max-w-38 transition-all duration-500 ease-out overflow-hidden">
                                Discover collection!
                            </span>

                            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </article>
                </div>
            ))}
        </section>
    );
}



export function PetsSuppliesBanner() {
    const bannerArray = [
        {
            id: 1,
            image: {
                url: 'https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg',
            },
        },
        {
            id: 3,
            image: {
                url: 'https://images.pexels.com/photos/4964846/pexels-photo-4964846.jpeg',
            },
        },
        {
            id: 2,
            image: {
                url: 'https://images.pexels.com/photos/1398185/pexels-photo-1398185.jpeg',
            },
        },
        {
            id: 3,
            image: {
                url: 'https://images.pexels.com/photos/4964846/pexels-photo-4964846.jpeg',
            },
        },
        {
            id: 1,
            image: {
                url: 'https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg',
            },
        },
    ]

    const collectionHandle = "pets"


    if (!Array.isArray(bannerArray)) {
        return null;
    }


    return (
        <section className="flex flex-col sm:flex-col gap-2">
            {/* LEFT */}

            <div className="w-full flex flex-row gap-2 md:h-70 h-50">
                {bannerArray.slice(0, 2).map((banner: any, index) => (
                    <Link
                        key={banner}
                        to={`/collections/${collectionHandle}`}
                        aria-label={collectionHandle}
                        className={`relative md:p-10 p-5 text-white md:rounded-3xl rounded-2xl md:h-full overflow-hidden 
                            ${index % 2 === 0 ? "w-2/3" : "w-1/3"}
                        `}
                    >
                        <Image
                            data={bannerArray[0]?.image}
                            alt={collectionHandle}
                            className="-z-1 absolute inset-0 object-cover md:rounded-3xl rounded-2xl w-full h-full hover:scale-105  duration-500"
                        />

                        <HeaderText
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
                {bannerArray.slice(2, 5).map((banner: any, index) => (
                    <Link
                        key={banner.id}
                        to={`/collections/${collectionHandle}`}
                        aria-label={collectionHandle}
                        className={`relative md:p-7 p-5 text-white md:rounded-3xl rounded-2xl md:h-full overflow-hidden w-1/3
                        `}
                    >


                        <SmallHeaderText
                            HEAD='Cat & Dog'
                        />

                        <Image
                            data={banner?.image}
                            alt={collectionHandle}
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


export function ConsumerElectronicsBanner() {


    const absoluteDiscount = [
        {
            position: "top-5 right-10",
            rotate: "rotate-5",
            discount: "50 on accessories",
            discountType: "hot deal"
        },
        {
            position: "top-[40%] right-40",
            rotate: "-rotate-7",
            discount: "30 laptops",
            discountType: "hot deal"
        },
        {
            position: "top-[70%] right-7",
            rotate: "rotate-10",
            discount: "70 on cameras",
            discountType: "hot deal"
        }
    ]




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

                    {/* Discount Badges */}
                    {/* {absoluteDiscount.map((badge, index) => (
                        <div
                            key={index}
                            className={`absolute ${badge.position} backdrop-blur-sm md:p-5 p-3 md:rounded-3xl rounded-2xl ${badge.rotate} z-20 max-w-40 bg-white/20`}
                        >
                            <p className="font-medium leading-tight">UP TO {badge.discount}% OFF</p>
                            <span className="">{badge.discountType}</span>
                        </div>
                    ))} */}
                </article>


                <article className="flex md:flex-col flex-row md:h-70 h-30 min-h-full md:w-1/3 w-full gap-3">
                    {products.slice(0, 2).map((product, index) => (
                        <div
                            key={index}
                            className={`h-full text-black relative overflow-hidden w-full p-5 text-center`}
                        >
                            <Image
                                src={"https://images.pexels.com/photos/3945663/pexels-photo-3945663.jpeg"}
                                alt={product.name}
                                className="absolute -z-1 inset-0 w-full h-full object-cover md:rounded-3xl rounded-2xl hover:scale-105 duration-300"
                            />
                            <HeaderText
                                HEAD={product.name}
                                SUBHEAD='Up TO 50% OFF'
                            />
                        </div>
                    ))}
                </article>
            </div>



            {/* Bottom Products - Mapped */}
            <article className="grid grid-cols-3 gap-3">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className={`text-white relative md:h-50 h-30 overflow-hidden ${product.gradient} p-5 text-center flex flex-col justify-between`}
                    >
                        <Image
                            src={"https://images.pexels.com/photos/6370375/pexels-photo-6370375.jpeg"}
                            alt={product.name}
                            className="absolute -z-1 inset-0 w-full h-full object-cover md:rounded-3xl rounded-2xl hover:scale-105 duration-300"
                        />
                        <SmallHeaderText
                            HEAD={product.name}
                            SUBHEAD='Starting at $299'
                        />
                    </div>
                ))}
            </article>
        </div>
    );
};

