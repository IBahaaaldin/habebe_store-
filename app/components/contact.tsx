import { Twitter, Instagram, Linkedin, Facebook, Globe } from 'lucide-react';


const ContactPage = () => {



    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8 font-sans">
            <section className="max-w-6xl w-full  md:rounded-2xl rounded-xl overflow-hidden flex flex-col lg:flex-row">

                {/* Left Side: Branding & Graphics */}
                <section className="bg-lime-300  w-full">
                    <div className="z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </div>
                            <span className="font-bold text-xl">Untitled UI</span>
                        </div>
                    </div>

                    {/* Abstract Radial Background with Avatars */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-full h-full">
                            {/* Concentric Circles */}
                            {[1, 2, 3, 4, 5].map((circle) => (
                                <div
                                    key={circle}
                                    className="absolute border border-gray-100 rounded-full"
                                    style={{
                                        width: `${circle * 180}px`,
                                        height: `${circle * 180}px`,
                                        top: '50%',
                                        left: '100%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            ))}
                            {/* Placeholder Avatars (Manual Positioning to mimic design) */}
                            <img src="https://i.pravatar.cc/150?u=1" className="absolute top-1/4 right-1/4 w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="team" />
                            <img src="https://i.pravatar.cc/150?u=2" className="absolute bottom-1/3 left-1/4 w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="team" />
                            <img src="https://i.pravatar.cc/150?u=3" className="absolute top-1/2 left-10 w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="team" />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="z-10 space-y-4">
                        <div className="flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer transition">
                            <Facebook size={20} /> <span className="text-sm font-medium">@UntitledUI</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer transition">
                            <Twitter size={20} /> <span className="text-sm font-medium">@UntitledUI</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer transition">
                            <Linkedin size={20} /> <span className="text-sm font-medium">@UntitledUI</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer transition">
                            <Globe size={20} /> <span className="text-sm font-medium">@UntitledUI</span>
                        </div>
                    </div>



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
                </section>

                {/* Right Side: The Form */}
                <section className="lg:w-3/5 bg-[#D4FF5F] p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-xl mx-auto w-full">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact us</h1>
                        <p className="text-lg text-gray-800 mb-10">Reach out and we'll get in touch within 24 hours.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">First name</label>
                                    <input type="text" placeholder="First name" className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-black outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Last name</label>
                                    <input type="text" placeholder="Last name" className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-black outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-black outline-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Team size</label>
                                    <select className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-black outline-none bg-white">
                                        <option>1-50 people</option>
                                        <option>51-200 people</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Location</label>
                                    <select className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-black outline-none bg-white">
                                        <option>Australia</option>
                                        <option>United States</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Message</label>
                                <textarea rows="4" placeholder="Leave us a message..." className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-black outline-none resize-none"></textarea>
                            </div>

                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="privacy" className="w-5 h-5 rounded border-none text-black focus:ring-black" />
                                <label htmlFor="privacy" className="text-sm">You agree to our friendly <span className="underline cursor-pointer">privacy policy</span>.</label>
                            </div>

                            <button className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors">
                                Send message
                            </button>
                        </form>

                        {/* Social Proof Logotypes */}
                        <div className="mt-12 pt-8 border-t border-black/10">
                            <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale">
                                <span className="font-bold text-xl">contentful</span>
                                <span className="font-bold text-xl">stripe</span>
                                <span className="font-bold text-xl">toggl</span>
                                <span className="font-bold text-xl">Evernote</span>
                                <span className="font-bold text-xl">zapier</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default ContactPage;