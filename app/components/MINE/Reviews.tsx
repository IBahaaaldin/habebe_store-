import AutoScrollArray from '../MINE/ReUsable/AutoScrollArray';
import HeaderText from '../MINE/UI/HeaderText';
import { Star, StarHalf } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';



const testimonials = [
    {
        text: "mistreyshopper feels intentional and refined. Minimal design, but it carries real meaning. I wore it out once and immediately got asked where it was from.",
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
        text: "I usually don’t buy graphic tees, but mistreyshopper feels different. Subtle and tasteful.",
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
        text: "Wearing mistreyshopper feels expressive without being loud. That balance is hard to achieve.",
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
        text: "I’d absolutely recommend mistreyshopper to friends who appreciate minimal design with meaning.",
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



export default function Reviews({ Title }: { Title?: string }) {


    const Head = Title ? `${Title}'s Reviews` : "What our clients say"


    const [comment, setComment] = useState<string>('')
    const [commentSubmited, setcommentSubmited] = useState(false)


    function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setComment(''); // Clear the textarea after submission
        setcommentSubmited(true)
        // toast.success("Comment submitted successfully")
    }



    const containerRef = useRef<HTMLDivElement>(null);
    AutoScrollArray({ REFERENCE: containerRef })



    return (
        <section className="flex flex-col items-start justify-start mx-auto w-full">


            {Title &&
                <HeaderText
                    HEAD={Head}
                />
            }


            <div className='relative w-full'>
                <div ref={containerRef} className='flex flex-row overflow-hidden py-5 gap-3 justify-start w-full'>
                    {testimonials.map((testimonial, index) => (
                        <article
                            key={index}
                            className="min-w-60 overflow-hidden border border-black/10 flex flex-col items-stretch gap-3 bg-white  md:rounded-3xl rounded-2xl md:px-5 md:py-7 p-3"
                        >

                            <span className='flex flex-row '>
                                {Array.from({ length: 5 }, (_, index: number) => index + 1).map((star, index) =>
                                    (testimonial.rating >= star ? <Star size={20} key={index} className='fill-green-700 text-transparent' /> : <StarHalf size={22} className='fill-green-700 text-transparent' key={index} />)
                                )}
                            </span>

                            <span> {testimonial.text}</span>

                            <div className='flex flex-col items-start justify-start'>
                                <span className="text-black/30 ">@{testimonial.user}</span>



                                <p className="flex items-center">
                                    <IoCheckmarkCircle className={`${testimonial.verified ? "text-green-700" : "text-zinc-500 "} mr-1`} />
                                    <span className="">{testimonial.verified ? "Unverified Rating" : "Verified Rating"}</span>
                                </p>
                            </div>
                        </article>
                    ))}
                </div>



                {/* ABSOLUTE */}
                <div
                    className="z-1 absolute bg-linear-to-r to-white from-transparent top-0 right-0 w-[10%] h-full pointer-events-none"
                />
                <div className="z-1 absolute bg-linear-to-r from-white to-transparent top-0 left-0 w-[10%] h-full pointer-events-none" />
            </div>



            {/* Comments section */}
            <article className="flex flex-col gap-3 items-start justify-start w-full lg:my-7 my-3">

                {commentSubmited ? (
                    <div className="w-full flex flex-col items-center justify-center p-10 border border-green-700/20 md:rounded-3xl rounded-2xl bg-green-50">
                        <IoCheckmarkCircle className="text-green-700 h-20 w-20" />
                        <h4 className="font-medium">Thank you for your comment!</h4>
                        <span className="text-center text-zinc-500">We appreciate your feedback and will use it to improve our products and services.</span>
                    </div>
                ) : (
                    <form onSubmit={handleCommentSubmit} className="flex flex-col min-w-full gap-5 items-start justify-start">
                        <textarea
                            maxLength={200}
                            onChange={(e) => setComment(e.target.value)}
                            className="md:text-sm text-xs w-full bg-zinc-50 resize-none p-5 h-30 rounded-2xl border border-black/5"
                            placeholder="Write a comment for us (Praise or Demolish)"
                        />
                        <button type="submit" className="BUTTON1">Submit</button>
                    </form>)
                }
            </article>
        </section>
    );
};
