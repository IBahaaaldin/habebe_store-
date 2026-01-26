import { Link } from "react-router";






const termsData = [
    {
        id: 1,
        title: "Agreement to Terms",
        content: (
            <>
                By accessing our website <Link to="https://habebe.store" className="underline">habebe.store</Link>, engaging with our fashion consultants, or using any services provided by <strong>habebe</strong> (collectively, the &quot; Services&quot;), you agree to be bound by these Terms & Conditions (&quot;Terms&quot;).
                <br /><br />
                If you do not agree with any part of these Terms, you must immediately discontinue use of our Services.
            </>
        ),
    },
    {
        id: 2,
        title: "Use of Services",
        content: (
            <>
                You must be at least 18 years old and legally capable of entering into binding contracts to use our Services. You agree to:
            </>
        ),
        bulletList: [
            "Provide accurate, current, and complete information during registration or purchase transactions.",
            "Maintain the confidentiality of your account credentials.",
            "Notify us immediately of any unauthorized use of your account.",
            "Use our Services only for lawful purposes and in compliance with all applicable UAE laws and regulations.",
        ],
    },
    {
        id: 3,
        title: "Fashion Retail Services",
        content: (
            <>
                <strong>habebe</strong> is a Dubai-based fashion brand specializing in contemporary and luxury clothing designs. We provide:
            </>
        ),
        bulletList: [
            "Online and in-store shopping for exclusive fashion collections.",
            "Custom design and tailoring services for personalized clothing creations.",
            "Fashion consultation and styling guidance from our experienced team.",
        ],
        footer: (
            <p className="mt-4">
                We do not guarantee specific sizes, colors, or designs will be available at all times, nor do we warrant the durability or suitability of any garment beyond our stated return policy.
            </p>
        ),
    },
    {
        id: 4,
        title: "Customer Responsibilities",
        bulletList: [
            "You are responsible for verifying product descriptions, sizes, colors, and materials before purchase.",
            "You must provide accurate measurements and customization preferences for custom orders.",
            "You agree to inspect items upon delivery and report any defects within the specified timeframe.",
            "You are responsible for return shipping costs unless the item is defective or damaged upon arrival.",
        ],
    },
    {
        id: 5,
        title: "Pricing & Payment",
        content: (
            <>
                All prices are displayed in United Arab Emirates Dirhams (AED) and include applicable taxes unless otherwise stated. Payment terms include:
            </>
        ),
        bulletList: [
            "Payment accepted via credit card, debit card, digital wallets, and bank transfer.",
            "Prices may change without notice, but confirmed orders will honor the price at checkout.",
            "Custom orders require a deposit or full payment before production begins.",
            "Shipping and handling fees will be calculated and displayed before final purchase confirmation.",
        ],
    },
    {
        id: 6,
        title: "Intellectual Property",
        content: (
            <>
                All content on our website, including but not limited to product photos, descriptions, designs, logos, and brand materials, is owned by <strong>habebe</strong> or licensed to us. You may not:
            </>
        ),
        bulletList: [
            "Copy, reproduce, or distribute product photos or descriptions without permission.",
            "Use automated systems (e.g., scrapers, bots) to extract data from our website.",
            "Remove watermarks or copyright notices from images or media.",
            "Reproduce or claim ownership of our original designs without authorization.",
        ],
    },
    {
        id: 7,
        title: "Product Information & Accuracy",
        content: (
            <>
                We strive to provide accurate product descriptions, images, and pricing. However, we are not responsible for errors, omissions, or variations in color representation due to screen display differences.
                <br /><br />
                Product availability is subject to stock levels and may change without notice.
            </>
        ),
    },
    {
        id: 8,
        title: "Limitation of Liability",
        content: (
            <>
                To the fullest extent permitted by law, <strong>habebe</strong>, its agents, employees, and affiliates shall not be liable for:
            </>
        ),
        bulletList: [
            "Any indirect, incidental, special, consequential, or punitive damages.",
            "Loss of profits, data, or business opportunities.",
            "Errors or inaccuracies in product information or website content.",
            "Decisions made or actions taken based on information from our Services.",
            "Delays or failures in delivery due to circumstances beyond our control.",
        ],
    },
    {
        id: 9,
        title: "Indemnification",
        content: (
            <>
                You agree to indemnify and hold harmless <strong>habebe</strong> and its agents from any claims, losses, or damages arising from your misuse of our Services or violation of these Terms.
            </>
        ),
    },
    {
        id: 10,
        title: "Termination",
        content: (
            <>
                We reserve the right to terminate or suspend your access to our Services at any time, with or without cause or notice, including for violation of these Terms.
            </>
        ),
    },
    {
        id: 11,
        title: "Governing Law",
        content: (
            <>
                These Terms shall be governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. Any disputes shall be resolved in accordance with UAE law and the jurisdiction of Dubai courts.
            </>
        ),
    },
    {
        id: 12,
        title: "Changes to Terms",
        content: (
            <>
                We may revise these Terms at any time by updating this page. Continued use of our Services after changes constitutes acceptance of the new Terms.
            </>
        ),
    },
    {
        id: 13,
        title: "Contact Information",
        content: (
            <>
                Questions about these Terms & Conditions should be directed to:
            </>
        ),
        contactInfo: [
            { label: "Company Name", value: "habebe" },
            { label: "Email", value: "hello@habebe.store", link: "mailto:hello@habebe.store" },
            { label: "Phone", value: "+971 56 157 6657", link: "tel:+971561576657" },
            { label: "Address", value: "Dubai, United Arab Emirates" },
        ],
    },
];

export default function TermsPage() {
    const lastUpdated = "December 25, 2025";

    return (
        <main>
            <div className="max-w-4xl mx-auto px-6 py-16 font-sans text-black">
                <h3 className="text-4xl font-medium text-center mb-1 text-black">Terms & Conditions</h3>
                <p className="text-center text-zinc-500 ">
                    Last Updated: <span className="font-medium">{lastUpdated}</span>
                </p>

                {termsData.map((section) => (
                    <section key={section.id} className=" scroll-mt-24" id={`section-${section.id}`}>
                        <h5 className="mt-5 font-semibold mb-3 text-black">
                            {section.id}. {section.title}
                        </h5>

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
                                <ul className="mt-6 space-y-1 text-black">
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
