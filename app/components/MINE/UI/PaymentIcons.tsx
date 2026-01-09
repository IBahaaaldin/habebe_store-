const paymentMethods: string[] = [
    '/googlepay.svg',
    '/applepay.svg',
    '/mastercard.svg',
    '/visa.svg',
    '/paypal.svg',
    '/stripe.svg',
];



export default function PaymentIcons() {
    return (
        <section className="flex flex-row flex-wrap gap-x-3 justify-start items-start" >
            {paymentMethods.map((icon, index) => (
                <div key={index} className="min-w-10 max-w-10">
                    <img src={icon} alt="payment method" />
                </div>
            ))}
        </section >
    );
}
