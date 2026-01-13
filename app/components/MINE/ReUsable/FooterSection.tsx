import { FaEnvelope, FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";
import { Image } from "@shopify/hydrogen";
import PaymentIcons from "../UI/PaymentIcons";






export default function FooterSection({ header }: { header: any }) {

    const [email, setEmail] = useState<string>('')


    /// Show Subscribe Alert
    function subscribeFun() {
        if (email.length > 5 && email.includes('com') && email.includes('@')) {
            // toast.success("subscribed successfully")
            setEmail("")
        } else {
            // toast.error('Please enter a valide email')
        }
    }



    const socialLinks = [
        {
            name: "Instagram",
            path: "https://www.instagram.com/habebe.store",
            logo: <FaInstagram />,
        },
        {
            name: "TikTok",
            path: "https://www.tiktok.com/@habebe.store",
            logo: <FaTiktok />,
        },
        {
            name: "WhatsApp",
            path: "https://api.whatsapp.com/send?phone=+971589840405&text=Hello%2C%20I%20am%20interested%20in%20your%20services",
            logo: <FaWhatsapp />,
        },
        {
            name: "Facebook",
            path: "https://www.facebook.com/habebe/",
            logo: <FaFacebook />,
        },
        {
            name: "Twitter",
            path: "https://twitter.com/habebe",
            logo: <FaTwitter />,
        },
    ];



    const PagesLinks = [
        {
            name: "About",
            path: "/about",
        },
        {
            name: "Contact",
            path: "/contact",
        },
        {
            name: "orders",
            path: "/orders",
        },
        {
            name: "cart",
            path: "/cart",
        },
        {
            name: "Terms & Conditions",
            path: "terms-conditions"
        },
        {
            name: "Privacy Policy",
            path: "privacy-policy"
        }
    ];



    return (
        <footer className="HOME_WRAPPER duration-500 grid lg:grid-cols-3 md:grid-cols-2 md:gap-x-10 gap-x-5 md:gap-y-15 gap-y-10 items-between justify-between bg-white md:rounded-2xl rounded-xl relative overflow-hidden py-10 *:min-w-1/3 *:w-full">



            {/* /// SECOND MENU */}
            <section className='flex flex-col min-h-full gap-1'>
                <h5 className="text-black/50 mb-3">
                    Quick Navigation
                </h5>

                <div className="flex flex-col gap-1">
                    {PagesLinks.map((page, index) => (
                        <Link
                            to={page.path || '#'}
                            key={index}
                            className="hover:text-orange-400 text-black font-bold text-start duration-500"
                        >
                            <span>
                                {page.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>




            {/* /// MENU */}
            <section className='flex flex-col min-h-full gap-1'>
                <h5 className="text-black/50 mb-3">
                    Main Categories
                </h5>


                <div className="flex flex-col gap-1">
                    {header.menu?.items.map((menu: any) => (
                        <Link
                            to={`/collections/${menu.resource?.handle || '#'}`}
                            key={menu.id}

                            className="hover:text-orange-400 text-black font-bold text-start duration-500"
                        >
                            <span>
                                {menu.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>



            {/* /// Subscribe */}
            <section className='flex flex-col min-h-full justify-start gap-5'>
                <div className="flex flex-col gap-3">
                    <h5 className="text-black/50">
                        Subscribe to our newsletter
                    </h5>
                    <span className="text-black">Dont miss our latest news, updates, and exclusive offers and stay ahead of your peers</span>
                </div>

                <input
                    type="text"
                    placeholder="Enter your email"
                    className="INPUT"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button className="BUTTON2 w-full"
                    onClick={() => subscribeFun()}
                >Subscribe</button>
            </section>




            {/* /// ABOUT US */}
            <section className="w-full flex flex-row gap-3 items-start justify-start">
                {header.shop.brand?.logo?.image?.url && (
                    <figure className="w-17  overflow-hidden">
                        <Image
                            src={header.shop.brand.logo.image.url}
                            alt={header.shop.name}
                            className="object-cover w-full aspect-square scale-110"
                            aspectRatio="1/1"
                        />
                    </figure>
                )}

                {/* //  */}
                <div className="flex flex-col gap-3">
                    {header.shop.name && (
                        <h4 className="text-nowrap font-bold">{header.shop.name}</h4>
                    )}


                    <article className=" w-fit flex flex-row items-center gap-3">
                        {socialLinks.map((link, index: number) => (
                            link && (
                                <a
                                    key={index}
                                    href={link.path}
                                    className="text-lg mt-1 cursor-pointer hover:opacity-50 hover:text-orange-400 duration-300">
                                    {link.logo}
                                </a>
                            )
                        ))}
                    </article>
                </div>
            </section>



            {/* /// Social Media */}
            <section className='flex flex-col min-h-full justify-start gap-10'>
                <div className="flex flex-col gap-5">
                    <span className=" text-black/50 ">
                        We are here to make life easier, Everything you want, in one place.
                    </span>

                    <ul className="flex flex-row items-center gap-5 ">
                        <Link to={'/contact-us'}>
                            <button className="BUTTON2 ">Contact Us</button>
                        </Link>
                        <Link to={'mailto:info@habebe.store'} className=" text-black duration-500">
                            <FaEnvelope className="text-lg hover:text-orange-400 duration-500" />
                        </Link>
                    </ul>
                </div>
            </section>



            {/* /// PAYMENT */}
            <PaymentIcons />
        </footer>
    )
}