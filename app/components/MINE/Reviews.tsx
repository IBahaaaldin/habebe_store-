import AutoScrollArray from '../MINE/ReUsable/AutoScrollArray';
import HeaderText from '../MINE/UI/HeaderText';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';

const testimonials = [
    {
        text: "STORYSTORY feels intentional and refined. Minimal design, but it carries real meaning. I wore it out once and immediately got asked where it was from.",
        user: "Karim H.",
        rating: 5,
        imageUrl: "",
        verified: false
    },
    {
        text: "The fabric quality really surprised me. Comfortable, well-made, and easy to style.",
        user: "Emily R.",
        rating: 4,
        imageUrl: "",
        verified: true
    },
    {
        text: "This doesn’t feel like a typical souvenir brand. It’s modern, confident, and genuinely well-designed.",
        user: "Lucas M.",
        rating: 5,
        imageUrl: "",
        verified: true
    },
    {
        text: "It’s more than a shirt — it’s a statement piece. Simple, but people notice it.",
        user: "Daniel K.",
        rating: 5,
        imageUrl: "",
        verified: true
    },
    {
        text: "Clean branding, great fit, and thoughtful details. You can tell a lot of care went into this.",
        user: "Sophie L.",
        rating: 5,
        imageUrl: "",
        verified: false
    },
    {
        text: "I usually don’t buy graphic tees, but STORYSTORY feels different. Subtle and tasteful.",
        user: "Marco B.",
        rating: 5,
        imageUrl: "",
        verified: true
    },
    {
        text: "A rare case where cultural inspiration feels elegant, not forced. Really impressive.",
        user: "Anna W.",
        rating: 4,
        imageUrl: "",
        verified: true
    },
    {
        text: "Wearing STORYSTORY feels expressive without being loud. That balance is hard to achieve.",
        user: "James P.",
        rating: 5,
        imageUrl: "",
        verified: true
    },
    {
        text: "The quality holds up after multiple washes, which honestly matters more than anything.",
        user: "Oliver T.",
        rating: 5,
        imageUrl: "",
        verified: true
    },
    {
        text: "It feels premium without trying too hard. One of my favorite recent purchases.",
        user: "Nina S.",
        rating: 5,
        imageUrl: "",
        verified: false
    },
    {
        text: "I’d absolutely recommend STORYSTORY to friends who appreciate minimal design with meaning.",
        user: "Ethan C.",
        rating: 4,
        imageUrl: "",
        verified: true
    },
    {
        text: "This is the kind of brand you expect to find in a concept store in Europe. Very well done.",
        user: "Leo V.",
        rating: 5,
        imageUrl: "",
        verified: true
    }
];



export default function Reviews({ Title, ProductId }: { Title?: string, ProductId?: string }) {


    const Head = Title ? `${Title}'s Reviews` : "What our clients say"


    const [comment, setComment] = useState<string>('')
    const [commentSubmited, setcommentSubmited] = useState(false)



    function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setComment(''); // Clear the textarea after submission
        setcommentSubmited(true)
        toast.success("Comment submitted successfully")
    }



    const containerRef = useRef<HTMLDivElement>(null);
    AutoScrollArray({ REFERENCE: containerRef })



    return (
        <section className="flex flex-col items-start justify-start mx-auto w-full">


            <HeaderText
                HEAD={Head}
            />


            <div className='relative w-full'>
                <div ref={containerRef} className='flex flex-row overflow-hidden py-5 gap-5 items-start justify-start w-full'>
                    {testimonials.map((testimonial, index) => (
                        <motion.article
                            initial={{ filter: 'blur(10px)' }}
                            whileInView={{ filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            key={index}
                            className="font-bold overflow-hidden border border-black/10 text-sm min-w-80 min-h-full flex flex-col items-stretch gap-5 bg-white justify-stretch rounded-3xl p-10"
                        >

                            <span className='flex flex-row '>
                                {Array.from({ length: 5 }, (_, index) => index + 1).map((star, index) =>
                                    (testimonial.rating >= star ? <Star size={22} key={index} className='fill-yellow-400 text-transparent' /> : <StarHalf size={22} className='fill-yellow-400 text-transparent' key={index} />)
                                )}
                            </span>

                            <p className='text-lg'> {testimonial.text}</p>

                            <div className='flex flex-col items-start justify-start'>
                                <p className="text-black/30">@{testimonial.user}</p>


                                {testimonial.verified ?
                                    <div className="flex items-center ">
                                        <IoCheckmarkCircle className="text-green-500 mr-1" />
                                        <span className="">Verified Rating</span>
                                    </div>
                                    :
                                    <div className="flex items-center ">
                                        <IoCheckmarkCircle className="text-zinc-500 mr-1" />
                                        <span className="">Unverified Rating</span>
                                    </div>
                                }
                            </div>


                            <div className="absolute -bottom-10 -left-5 -z-10 h-50 w-60 rounded-full bg-linear-to-b from-black/10 to-transparent blur-xl"></div>
                        </motion.article>
                    ))}
                </div>



                {/* ABSOLUTE */}
                <div
                    className="z-1 absolute bg-gradient-to-r to-white from-transparent top-0 right-0 lg:w-40 w-20 h-full pointer-events-none"
                />
                <div className="z-1 absolute bg-gradient-to-r from-white to-transparent top-0 left-0 lg:w-40 w-20 h-full pointer-events-none" />

            </div>



            {/* Comments section */}
            <article className="flex flex-col gap-5 items-start justify-start w-full my-10">

                {commentSubmited ? (
                    <div className="w-full flex flex-col gap-5 items-center justify-center p-10 border border-green-500 rounded-3xl bg-green-50">
                        <IoCheckmarkCircle className="text-green-500 h-20 w-20" />
                        <h3 className="text-2xl font-bold">Thank you for your comment!</h3>
                        <p className="text-center text-zinc-700">We appreciate your feedback and will use it to improve our products and services.</p>
                    </div>
                ) : (
                    <form onSubmit={handleCommentSubmit} className="flex flex-col min-w-full gap-5 items-start justify-start">
                        <textarea
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-zinc-50 resize-none p-5 h-40 rounded-4xl border border-black/90"
                            placeholder="Write a comment for us (Praise or Demolish)"
                        />
                        <button type="submit" className="button1">Submit</button>
                    </form>)
                }
            </article>
        </section>
    );
};
