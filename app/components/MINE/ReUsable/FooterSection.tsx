import { FaEnvelope, FaFacebook, FaInstagram, FaMailchimp, FaTiktok, FaTwitter, FaVoicemail, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";
import { toast } from 'react-toastify';
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Codepen } from "lucide-react";
import type { FooterQuery, HeaderQuery } from "storefrontapi.generated";
import { Image } from "@shopify/hydrogen";
import PaymentIcons from "../UI/PaymentIcons";




interface FooterProps {
    footer: Promise<FooterQuery | null>;
    header: HeaderQuery;
    publicStoreDomain: string;
}


export default function FooterSection({ footer,
    header,
    publicStoreDomain }: FooterProps) {



    /// 
    interface PagesType {
        name: string;
        path?: string;
        ref?: React.RefObject<HTMLDivElement>;
    }

    const pages: PagesType[] = [
        { name: 'Collections', path: '/' },
        { name: 'Projects', path: '/all-properties' },
        { name: 'Contact', path: '/contact-us' },
    ]


    const [email, setEmail] = useState<string>('')


    /// Show Subscribe Alert
    function subscribeFun() {
        if (email.length > 5 && email.includes('com') && email.includes('@')) {
            toast.success("subscribed successfully")
            setEmail("")
        } else (
            toast.error('Please enter a valide email')
        )
    }






    const socialLinks = [
        {
            name: "Instagram",
            path: "https://www.instagram.com/mistreyshopper.com",
            logo: <FaInstagram />,
        },
        {
            name: "TikTok",
            path: "https://www.tiktok.com/@mistreyshopper.com",
            logo: <FaTiktok />,
        },
        {
            name: "WhatsApp",
            path: "https://api.whatsapp.com/send?phone=+971589840405&text=Hello%2C%20I%20am%20interested%20in%20your%20services",
            logo: <FaWhatsapp />,
        },
        {
            name: "Facebook",
            path: "https://www.facebook.com/mistreyshopper/",
            logo: <FaFacebook />,
        },
        {
            name: "Twitter",
            path: "https://twitter.com/mistreyshopper",
            logo: <FaTwitter />,
        },
    ];




    return (
        <footer className="max-w-[1750px] px-[5%] mx-auto duration-500 grid lg:grid-cols-3 md:grid-cols-2 md:gap-15 gap-10 md:gap-y-20 gap-y-15 items-between justify-between bg-white rounded-3xl relative overflow-hidden py-10 *:min-w-1/3 *:w-full">

            <section className="flex flex-col gap-3">
                {header.shop.brand?.logo?.image?.url && (
                    <Image
                        src={header.shop.brand.logo.image.url}
                        alt={header.shop.name}
                        className="object-cover aspect-square max-w-15 max-h-15"
                        aspectRatio="1/1"
                    />
                )}


                {header.shop.name && (
                    <h1 className="text-3xl font-bold">{header.shop.name}</h1>
                )}

                {header.shop.description && (
                    <p className="capitalize text-black/50">
                        {header.shop.description}
                    </p>
                )}


                <article className=" w-fit flex flex-row items-center gap-5 ">
                    {socialLinks.map((link, index) => (
                        link && (
                            <a
                                key={index}
                                href={link.path}
                                className="text-2xl mt-1 cursor-pointer hover:opacity-50 hover:text-zinc-500 duration-300">
                                {link.logo}
                            </a>
                        )
                    ))}
                </article>
            </section>



            {/* /// ABOUT US */}
            <section className='flex flex-col min-h-full gap-2'>
                <h3 className="text-black/50 mb-3">
                    Quick Navigation
                </h3>

                {header.menu?.items.map((page, index) => (
                    <Link
                        to={page.url || '#'}
                        key={index}
                        className="hover:text-zinc-400 text-black font-bold text-start duration-500"
                    >
                        {page.title}
                    </Link>
                ))}
            </section>


            {/* /// Social Media */}
            <section className='flex flex-col min-h-full justify-between  gap-2'>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row items-center gap-3 w-full">
                        <figure className="relative flex flex-row items-center rounded-full gap-3 w-12 aspect-square overflow-hidden ">
                            {header.shop.brand?.logo?.image?.url && (
                                <Image
                                    src={header.shop.brand.logo.image.url}
                                    alt={header.shop.name}
                                    className="object-cover aspect-square max-w-15 max-h-15"
                                    aspectRatio="1/1"
                                />
                            )}
                        </figure>


                        <div className="flex flex-col">
                            <span className="text-black/50 text-xs">Al Hashimi</span>
                            <p className="font-bold  ">Co Founder of Mistry Shopper</p>
                        </div>
                    </div>


                    <p className=" text-black/50   leading-5">
                        We are here to make life easier, Everything you want, in one place.
                    </p>

                    <ul className="flex flex-row items-center gap-5 ">
                        <Link to={'/contact-us'}>
                            <button className="button2 ">Contact Us</button>
                        </Link>
                        <Link to={'mailto:info@mistreyshopper.com'} className=" text-black duration-500">
                            <FaEnvelope className="text-2xl hover:text-zinc-400 duration-500" />
                        </Link>
                    </ul>
                </div>
            </section>



            <section className='flex flex-col min-h-full justify-between gap-5'>
                <div className="flex flex-col gap-3">
                    <h3 className="text-black">
                        Subscribe to our newsletter
                    </h3>
                    <p className="text-black/50  ">Dont miss our latest news, updates, and exclusive offers and stay ahead of your peers</p>
                </div>

                <input
                    type="text"
                    placeholder="Enter your email"
                    className="placeholder:text-black/40 w-full bg-transparent p-1 text-black border-b border-black/40 py-1 outline-none"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button className="button2 "
                    onClick={() => subscribeFun()}
                >Subscribe</button>
            </section>



            <section className="flex flex-col gap-3">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.526358678226!2d55.25913717631394!3d25.185465977718472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d103361679%3A0x13f2d0058a5050cf!2sOntario%20Tower%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1763540311131!5m2!1sen!2sus"
                    className="rounded-3xl "
                    loading="lazy"
                    title="Our head office"
                />


                <div className="font-bold">
                    <p>CLuster B,</p>
                    <p>JLT,</p>
                    <p>Dubai, UAE</p>
                </div>
            </section>



            <section className="flex flex-col items-start gap-2 justify-between ">
                <p className="text-black/50">
                    Copyright 2025 @ what ever shit it is.
                </p>

                <div className="flex flex-row justify-between w-full font-bold">
                    <Link to={'terms-conditions'}>Terms & Conditions</Link>
                    <Link to={'privacy-policy'}>Privacy Policy</Link>
                </div>

                <PaymentIcons />
            </section>
        </footer>
    )
}