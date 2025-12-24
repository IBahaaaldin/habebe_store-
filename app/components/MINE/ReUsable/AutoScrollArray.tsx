import React, { useEffect, useRef } from 'react';



interface AutoScrollArrayProp {
    REFERENCE: React.MutableRefObject<HTMLDivElement | null>;
}

export default function AutoScrollArray({ REFERENCE }: AutoScrollArrayProp) {
    const animationId = useRef<number>(0);

    useEffect(() => {
        function autoScroll() {
            if (REFERENCE.current) {
                const { scrollLeft, scrollWidth, clientWidth } = REFERENCE.current;

                if (scrollLeft + clientWidth < scrollWidth) {
                    REFERENCE.current.scrollBy({ left: 0.5 }); // remove 'smooth'
                } else {
                    REFERENCE.current.scrollTo({ left: 0 });
                }
            }

            animationId.current = requestAnimationFrame(autoScroll);
        }

        autoScroll();

        return () => {
            cancelAnimationFrame(animationId.current);
        };
    }, []);

    return null;
}