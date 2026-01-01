import { ArrowRight } from 'lucide-react';
import React from 'react';



export default function ArrowButton({ Href, Text, CC }: { Href?: string; Text?: string, CC?: string; }): JSX.Element {
    return (
        <a
            href={Href}
            className={`flex flex-row items-center gap-7 pl-7 pr-1 py-1 rounded-full bg-orange-400  hover:bg-orange-500 duration-300 ${CC}`}
        >
            <span>{Text}</span>

            <div className="bg-white rounded-full p-1 flex items-center justify-center">
                <ArrowRight
                    size={23}
                    className="text-black"
                />
            </div>
        </a>
    );
};
