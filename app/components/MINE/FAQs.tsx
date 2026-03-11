
import { motion } from 'framer-motion';
import { useState } from 'react'
import HeaderText from './UI/HeaderText';
import { Plus } from 'lucide-react';


export default function FAQs() {
    const faqs = [
        {
            question: "What is habebe.store?",
            answer: "habebe.store is an online marketplace where you can shop for a wide range of products in one place."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship worldwide. Delivery times vary depending on your location."
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping time depends on the product and destination. Estimated delivery time is shown at checkout."
        },
        {
            question: "What is your return policy?",
            answer: "You can return items within 14 days of delivery if they are unused and in original condition."
        },
        {
            question: "How can I contact customer support?",
            answer: "You can contact us via email or through our official social media channels."
        }
    ];




    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="flex flex-col items-start justify-start w-full gap-3 md:p-10 p-5 border border-black/10 md:rounded-3xl rounded-2xl">
            <HeaderText
                HEAD="Frequently Asked Questions"
                SUBHEAD='Find answers to the most common questions about our products and services.'
            />

            <div className="w-full bg-zinc-50 p-5 md:rounded-3xl rounded-2xl overflow-hidden">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-black/10 p-3"
                    >
                        <button
                            aria-label='Toggle FAQ'
                            onClick={() => toggleFAQ(index)}
                            className="flex gap-5 cursor-pointer w-full text-left font-semibold justify-between items-center focus:outline-none"
                        >
                            <h5>{faq.question}</h5>
                            <Plus
                                className={`transition-transform duration-300 ${openFAQ === index ? 'rotate-45 text-zinc-500' : 'rotate-0'
                                    }`}
                            />
                        </button>

                        {/* Use CSS Grid for smooth height transition */}
                        <div
                            className={`grid transition-all duration-500 ease-in-out ${openFAQ === index ? 'grid-rows-[1fr] mt-1' : 'grid-rows-[0fr]'
                                }`}
                        >
                            <div className="overflow-hidden">
                                <p className="text-zinc-500">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}