import { Link } from "react-router";

const privacyData = [
    {
        id: 1,
        title: "Introduction",
        content: (
            <>
                At <strong>mistryshopper</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website <Link to="https://mistryshopper.com" className="underline">mistryshopper.com</Link> or use our services.
                <br /><br />
                By using our Services, you consent to the data practices described in this policy.
            </>
        ),
    },
    {
        id: 2,
        title: "Information We Collect",
        content: (
            <>
                We may collect personal information that you voluntarily provide to us when you register, make a purchase, or contact us. This includes:
            </>
        ),
        bulletList: [
            "Contact information (such as name, email address, and phone number).",
            "Shipping and billing addresses.",
            "Payment information (processed securely through our payment partners).",
            "Preferences and interests related to our fashion collections.",
            "Measurements and customization details for bespoke orders.",
        ],
    },
    {
        id: 3,
        title: "How We Use Your Information",
        content: (
            <>
                We use the information we collect for various purposes, including:
            </>
        ),
        bulletList: [
            "Processing and fulfilling your orders and transactions.",
            "Providing personalized fashion consultations and styling advice.",
            "Communicating with you about your orders, products, and promotions.",
            "Improving our website, products, and customer service.",
            "Complying with legal obligations and protecting our rights.",
        ],
    },
    {
        id: 4,
        title: "Information Sharing & Disclosure",
        content: (
            <>
                We do not sell or rent your personal information to third parties. We may share your data with:
            </>
        ),
        bulletList: [
            "Service providers who assist us in operating our website and conducting our business (e.g., shipping partners, payment processors).",
            "Legal authorities when required by law or to protect the safety and rights of mistryshopper and others.",
            "Business partners for joint marketing efforts, only with your explicit consent.",
        ],
    },
    {
        id: 5,
        title: "Data Security",
        content: (
            <>
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </>
        ),
    },
    {
        id: 6,
        title: "Your Rights & Choices",
        content: (
            <>
                You have certain rights regarding your personal information, including:
            </>
        ),
        bulletList: [
            "Accessing, updating, or deleting your account information.",
            "Opting out of receiving marketing communications from us.",
            "Requesting a copy of the personal data we hold about you.",
        ],
    },
    {
        id: 7,
        title: "Cookies & Tracking Technologies",
        content: (
            <>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can manage your cookie preferences through your browser settings.
            </>
        ),
    },
    {
        id: 8,
        title: "Third-Party Links",
        content: (
            <>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites and encourage you to read their privacy policies.
            </>
        ),
    },
    {
        id: 9,
        title: "Changes to This Privacy Policy",
        content: (
            <>
                We may update our Privacy Policy from time to time.We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot; Last Updated&rdquo; date.
            </>
        ),
    },
    {
        id: 10,
        title: "Contact Information",
        content: (
            <>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
            </>
        ),
        contactInfo: [
            { label: "Company Name", value: "mistryshopper" },
            { label: "Email", value: "privacy@mistryshopper.com", link: "mailto:privacy@mistryshopper.com" },
            { label: "Phone", value: "+971 56 157 6657", link: "tel:+971561576657" },
            { label: "Address", value: "Dubai, United Arab Emirates" },
        ],
    },
];

export default function PrivacyPage() {
    const lastUpdated = "December 25, 2025";

    return (
        <main>
            <div className="max-w-4xl mx-auto px-6 py-16 font-sans text-black">
                <h1 className="text-4xl font-bold text-center mb-4 text-black">Privacy Policy</h1>
                <p className="text-center text-zinc-500 mb-12">
                    Last Updated: <span className="font-medium">{lastUpdated}</span>
                </p>

                {privacyData.map((section) => (
                    <section key={section.id} className="mb-12 scroll-mt-24" id={`section-${section.id}`}>
                        <h2 className="text-2xl font-semibold mb-4 text-black">
                            {section.id}. {section.title}
                        </h2>

                        <div className="text-base leading-relaxed prose prose-lg max-w-none text-black">
                            {section.content}

                            {section.bulletList && (
                                <ul className="list-disc pl-6 mt-4 space-y-2 text-black">
                                    {section.bulletList.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.contactInfo && (
                                <ul className="mt-6 space-y-3 text-black">
                                    {section.contactInfo.map((info, i) => (
                                        <li key={i}>
                                            <span className="font-medium">{info.label}:</span>{" "}
                                            {info.link ? (
                                                <a href={info.link} className="text-black underline hover:no-underline">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                info.value
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
