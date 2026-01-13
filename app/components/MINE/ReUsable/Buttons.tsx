import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';



export default function ArrowButton({ Href, Text, CC }: { Href?: string; Text?: string, CC?: string; }): JSX.Element {
    return (
        <Link
            to={Href ?? '/'}
            className={`flex flex-row items-center justify-between md:gap-7 gap-3 md:pl-5 pl-3 pr-1 py-1 rounded-full bg-orange-400  hover:bg-orange-500 active:bg-orange-500 duration-300 ${CC}`}
        >
            <span className='text-nowrap'>{Text}</span>

            <div className="bg-white rounded-full p-1 flex items-center justify-center">
                <ArrowRight
                    className="md:w-6 md:h-6 w-4 h-4 text-black"
                />
            </div>
        </Link>
    );
};
