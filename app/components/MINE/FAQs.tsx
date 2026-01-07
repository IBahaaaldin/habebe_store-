
import { motion } from 'framer-motion';
import { useState } from 'react'
import HeaderText from './UI/HeaderText';


export default function FAQs() {
    const faqs = [
        {
            question: "What is habebe.store?",
            answer: "habebe.store is a global online marketplace where you can shop for a wide variety of products, all in one place."
        },
        {
            question: "What kind of products do you sell?",
            answer: "We offer products across many categories including fashion, electronics, home, lifestyle, accessories, gifts, and more."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship worldwide. Shipping availability and delivery times may vary by location."
        },
        {
            question: "How long does shipping take?",
            answer: "Delivery times depend on your location and the product. Estimated shipping times are shown at checkout."
        },
        {
            question: "How can I contact customer support?",
            answer: "You can reach our support team via email or through our official social media channels."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns within 14 days of delivery, as long as the item is unused and in its original condition."
        },
        {
            question: "Can I cancel my order?",
            answer: "Yes, orders can be canceled before they are shipped. Please contact support as soon as possible."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit and debit cards, PayPal, and other secure online payment methods."
        },
        {
            question: "How do I track my order?",
            answer: "Once your order ships, you’ll receive a confirmation email with tracking details."
        },
        {
            question: "What if my item arrives damaged?",
            answer: "If your item arrives damaged, contact us within 48 hours of delivery and we’ll arrange a replacement or refund."
        },
        {
            question: "What if I receive the wrong item?",
            answer: "If you receive an incorrect item, please contact us and we’ll resolve it quickly."
        },
        {
            question: "Can I exchange an item?",
            answer: "Yes, exchanges are available within 14 days of delivery, subject to product availability."
        },
        {
            question: "Are your products authentic?",
            answer: "Yes, we work with verified sellers and suppliers to ensure product quality and authenticity."
        },
        {
            question: "Do I need an account to place an order?",
            answer: "No, you can checkout as a guest without creating an account."
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
        <div className="flex md:flex-row flex-col items-start justify-start w-full gap-10 md:p-10 p-5 border border-black/10 rounded-3xl">

            <HeaderText
                HEAD="Frequently Asked Questions"
                SUBHEAD="Have questions about our services or how we can help your business? Here are some answers to the most frequently asked questions we receive. If you have any other questions or concerns, please don't hesitate to reach out. We're here to help!"
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

