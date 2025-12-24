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
        <div className="flex flex-row flex-wrap gap-x-3 justify-start items-center min-w-full" >
            {paymentMethods.map((icon, index) => (
                <div key={index} className="min-w-15 max-w-15">
                    <img src={icon} alt="payment method" />
                </div>
            ))}
        </div >
    );
}
