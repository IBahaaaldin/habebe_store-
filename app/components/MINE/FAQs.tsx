
import { motion } from 'framer-motion';
import { useState } from 'react'
import HeaderText from './UI/HeaderText';


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
        if (openFAQ === index) {
            setOpenFAQ(null); // Close it if it's already open
        } else {
            setOpenFAQ(index); // Open the clicked FAQ
        }
    };



    return (
        <div className="flex flex-col items-start justify-start w-full gap-5 md:p-10 p-5 border border-black/10 rounded-3xl">

            <HeaderText
                HEAD="Frequently Asked Questions"
            />


            <div className="bg-zinc-50 p-5 rounded-3xl overflow-hidden">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-black/10 p-3 duration-300 ease-in-out"
                    >
                        <motion.button
                            initial={{ opacity: 0, filter: 'blur(5px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 2, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            aria-label='Toggle FAQ'
                            onClick={() => toggleFAQ(index)} // Pass the index to toggle the specific FAQ
                            className={`${openFAQ === index ? '' : ''} flex gap-5 cursor-pointer w-full text-left md:text-lg font-semibold justify-between items-center focus:outline-none`}
                        >
                            <p> {faq.question}</p>
                            <span className="text-xl">{openFAQ === index ? "-" : "+"}</span>
                        </motion.button>

                        <div
                            className={`overflow-hidden text-black text-sm transition-all duration-300 ease-in-out ${openFAQ === index ? 'max-h-100 opacity-100 mt-1' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

