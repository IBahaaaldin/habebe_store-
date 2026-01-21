// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Facebook, Globe, Instagram } from 'lucide-react';
import React, { useState, type ChangeEvent, type FormEvent } from 'react';



interface FormData {
    firstName: string;
    lastName: string;
    location: string;
    email: string;
    phone: string;
    message: string;
}

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        location: '',
        email: '',
        phone: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        try {
            console.log('Form submitted:', formData);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                location: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };












    const socialLinks = [
        {
            name: "Instagram",
            path: "https://www.instagram.com/habebe.store",
            logo: <Instagram size={17} />,
        },
        {
            name: "Facebook",
            path: "https://www.facebook.com/habebe/",
            logo: <Facebook size={17} />,
        },
        {
            name: "Globe",
            path: "https://www.facebook.com/habebe/",
            logo: <Globe size={17} />,
        },
    ];


    return (
        <div className="overflow-hidden flex flex-col lg:flex-row gap-3 w-full">

            {/* Left Side: Branding & Graphics */}
            <section className="lg:w-2/5 md:p-10 p-5 flex flex-col gap-5 justify-between relative overflow-hidden bg-zinc-100 md:rounded-3xl rounded-2xl">
                <div className="flex items-center justify-start gap-2">
                    <div className="grid grid-cols-2 gap-1">
                        {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="w-2 h-2 bg-black rounded-full"></div>
                        ))}
                    </div>
                    <h4 className="font-bold">Habebe</h4>
                </div>

                {/* Abstract Radial Background with Avatars */}
                <article className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-full h-full">
                        {/* Concentric Circles */}
                        {[1, 2, 3, 4, 5].map((circle, index) => (
                            <div
                                key={circle}
                                className="absolute border border-zinc-300 rounded-full"
                                style={{
                                    width: `${circle * 180}px`,
                                    height: `${circle * 180}px`,
                                    top: '50%',
                                    left: '100%',
                                    transform: 'translate(-50%, -50%)',

                                    opacity: 1 * (2 / index),
                                }}
                            />
                        ))}
                        {/* Placeholder Avatars (Manual Positioning to mimic design) */}
                        <img src="https://images.pexels.com/photos/34074202/pexels-photo-34074202.jpeg" className="absolute top-[20%] right-[50px] w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="team" />
                        <img src="https://images.pexels.com/photos/34074202/pexels-photo-34074202.jpeg" className="absolute top-[50%] right-[150px] w-15 h-15 rounded-full border-2 border-white shadow-sm" alt="team" />
                        <img src="https://images.pexels.com/photos/34074202/pexels-photo-34074202.jpeg" className="absolute top-[30%] right-[290px] w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="team" />
                    </div>
                </article>

                {/* Social Links */}
                <article className=" w-fit flex flex-col items-center gap-3">
                    {socialLinks.map((link, index: number) => (
                        link && (
                            <div className='flex flex-row items-center gap-1'>
                                <a
                                    key={index}
                                    href={link.path}
                                    className="mt-1 flex gap-1 cursor-pointer hover:opacity-50 hover:text-orange-400 duration-300">
                                    {link.logo}
                                    <span className="font-bold">@habebe.store</span>
                                </a>
                            </div>
                        )
                    ))}
                </article>
            </section>



            {/* Right Side: The Form */}
            <section className="lg:w-3/5 bg-lime-300 p-5 lg:p-10 flex flex-col justify-center md:rounded-3xl rounded-3xl">
                <div className="max-w-xl mx-auto w-full flex flex-col gap-3">
                    <h2 className=" font-bold">Contact us</h2>
                    <h6 className="font-bold">Reach out and we'll get in touch within 24 hours.</h6>

                    <form onSubmit={handleSubmit} className="w-full mt-5">
                        <div className="w-full grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        autoComplete="given-name"
                                        placeholder="Your First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="INPUT"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        autoComplete="family-name"
                                        placeholder="Your Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="INPUT"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Location
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        required
                                        type="text"
                                        name="location"
                                        id="location"
                                        autoComplete="organization"
                                        placeholder="Your Location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="INPUT"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        placeholder="Your Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="INPUT"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Phone number
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        autoComplete="tel"
                                        placeholder="Your Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="INPUT"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Message
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        placeholder="Share your thoughts..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="INPUT"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="flex items-center gap-3 mb-5">
                            <input type="checkbox" id="privacy" className="w-5 h-5 rounded border-none text-black focus:ring-black" />
                            <label htmlFor="privacy" className="text-sm">You agree to our friendly <span className="underline cursor-pointer">privacy policy</span>.</label>
                        </div>


                        <button
                            disabled={status === 'submitting'}
                            className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-zinc-900 duration-300"
                        >
                            <p>
                                {status === 'submitting' ? 'Sending...' : 'Send message'}
                            </p>
                        </button>


                        {status === 'success' && (
                            <p className="mt-4 text-center text-sm font-semibold text-green-700">
                                Thank you! Your message has been sent successfully.
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-center text-sm font-semibold text-red-600">
                                Something went wrong. Please try again later.
                            </p>
                        )}
                    </form>



                    {/* /// Social Proof Logotypes */}
                    <footer className="mt-10 pt-5 border-t border-black/10  flex flex-wrap justify-center gap-8 opacity-70 grayscale">
                        {[
                            "contentful",
                            "stripe",
                            "toggl",
                            "Evernote",
                            "zapier",
                        ].map((brand) => (
                            <span key={brand} className="font-bold text-xl">
                                {brand}
                            </span>
                        ))}
                    </footer>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
