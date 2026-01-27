import React from 'react';

// 

const LoadingSpinner = () => {
    return (
        <div >
            {/* Outer Container with Animation */}
            <section className="animate-pulse md:flex md:space-x-10">

                {/* Right Image Placeholder */}
                <article className="md:w-1/2 w-full mb-5 md:mb-0 h-95 bg-zinc-100 md:rounded-3xl rounded-2xl" />

                {/* Left Content Placeholder */}
                <article className="md:w-1/2 w-full space-y-5">

                    {/* Product Title and Price Section */}
                    <div className="space-y-3">
                        {/* Title */}
                        <div className="h-10 bg-zinc-100 rounded w-3/5"></div>
                        {/* Subtitle/Category */}
                        <div className="h-5 bg-zinc-100 rounded w-1/3"></div>
                        {/* Price */}
                        <div className="h-10 bg-zinc-100 rounded w-1/5"></div>
                    </div>

                    {/* Action Buttons Placeholder */}
                    <div className="flex space-x-5 pt-2">
                        <div className="h-12 bg-green-100 md:rounded-3xl rounded-2xl w-2/5"></div>
                        <div className="h-12 bg-zinc-100 md:rounded-3xl rounded-2xl w-1/5"></div>
                    </div>

                    {/* Short Description */}
                    <div className="space-y-2 pt-5">
                        <div className="h-5 bg-zinc-100 rounded w-full"></div>
                        <div className="h-5 bg-zinc-100 rounded w-5/5"></div>
                        <div className="h-5 bg-zinc-100 rounded w-full"></div>
                        <div className="h-5 bg-zinc-100 rounded w-3/5"></div>
                    </div>
                </article>
            </section>


            {/* === 3. Additional Details/Specs Section (Below the main component) === */}
            <section className="animate-pulse space-y-5 mt-10">
                <h3 className="text-2xl font-semibold">
                    <div className="h-7 bg-zinc-100 rounded w-1/5"></div>
                </h3>
                {/* Full Paragraph Placeholder */}
                <div className="space-y-2">
                    <div className="h-5 bg-zinc-100 rounded w-full"></div>
                    <div className="h-5 bg-zinc-100 rounded w-full"></div>
                    <div className="h-5 bg-zinc-100 rounded w-11/12"></div>
                    <div className="h-5 bg-zinc-100 rounded w-full"></div>
                </div>
            </section>
        </div>
    );
};

export default LoadingSpinner;