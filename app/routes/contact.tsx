// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import HeaderText from '~/components/MINE/UI/HeaderText';


interface FormData {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    message: string;
}

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        company: '',
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
                company: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    return (
        <div>
            <HeaderText
                HEAD="Contact Us"
                SUBHEAD="We'd love to hear from you! Have a question, comment, or just want to say hi? We're all ears!"
            />

            <form onSubmit={handleSubmit} className="w-full">
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
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Company
                        </label>
                        <div className="mt-2.5">
                            <input
                                required
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                placeholder="Your Company Name"
                                value={formData.company}
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

                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`BUTTON2 ${status === 'submitting' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {status === 'submitting' ? 'Sending...' : 'Submit →'}
                    </button>
                </div>

                {status === 'success' && (
                    <p className="mt-4 text-center text-sm font-semibold text-green-600">
                        Thank you! Your message has been sent successfully.
                    </p>
                )}
                {status === 'error' && (
                    <p className="mt-4 text-center text-sm font-semibold text-red-600">
                        Something went wrong. Please try again later.
                    </p>
                )}
            </form>
        </div>
    );
};

export default ContactUs;
