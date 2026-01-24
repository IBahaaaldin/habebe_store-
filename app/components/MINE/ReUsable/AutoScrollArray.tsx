import React, { useEffect, useRef } from 'react';



interface AutoScrollArrayProp {
    REFERENCE: React.MutableRefObject<HTMLDivElement | null>;
}



export default function AutoScrollArray({ REFERENCE }: AutoScrollArrayProp) {
    const animationId = useRef<number>(0);
    const speed = useRef(1); // normal speed

    // useEffect(() => {
    //     function autoScroll() {
    //         if (REFERENCE.current) {
    //             const { scrollLeft, scrollWidth, clientWidth } = REFERENCE.current;

    //             if (scrollLeft + clientWidth < scrollWidth) {
    //                 REFERENCE.current.scrollLeft += speed.current;
    //             } else {
    //                 REFERENCE.current.scrollLeft = 0;
    //             }
    //         }

    //         animationId.current = requestAnimationFrame(autoScroll);
    //     }

    //     autoScroll();

    //     return () => cancelAnimationFrame(animationId.current);
    // }, []);


    useEffect(() => {
        function autoScroll() {
            if (REFERENCE.current) {
                const el = REFERENCE.current;

                el.scrollLeft += speed.current;

                // reset when reaching half (original width)
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            }

            animationId.current = requestAnimationFrame(autoScroll);
        }

        autoScroll();
        return () => cancelAnimationFrame(animationId.current);
    }, []);


    // expose hover handlers
    useEffect(() => {
        const el = REFERENCE.current;
        if (!el) return;

        const slow = () => (speed.current = 0.1);   // very slow
        const normal = () => (speed.current = 1);   // normal

        el.addEventListener('mouseenter', slow);
        el.addEventListener('mouseleave', normal);

        el.addEventListener('touchstart', slow);
        el.addEventListener('touchend', normal);
        el.addEventListener('touchcancel', normal);

        return () => {
            el.removeEventListener('mouseenter', slow);
            el.removeEventListener('mouseleave', normal);

            el.removeEventListener('touchstart', slow);
            el.removeEventListener('touchend', normal);
            el.removeEventListener('touchcancel', normal);
        };
    }, []);

    return null;
}