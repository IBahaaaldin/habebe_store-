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
        <div className="mt-5 flex flex-row flex-wrap gap-x-3 justify-start items-center min-w-full" >
            {paymentMethods.map((icon, index) => (
                <div key={index} className="min-w-12 max-w-12">
                    <img src={icon} alt="payment method" />
                </div>
            ))}
        </div >
    );
}
