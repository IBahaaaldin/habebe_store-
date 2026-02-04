import * as React from 'react';
import { Pagination } from '@shopify/hydrogen';
import { useEffect, useRef } from 'react';

export function PaginatedResourceSection<NodesType>({ connection, children, resourcesClassName, }: { connection: React.ComponentProps<typeof Pagination<NodesType>>['connection']; children: React.FunctionComponent<{ node: NodesType; index: number }>; resourcesClassName?: string; }) {

  return (
    <Pagination connection={connection}>
      {({ nodes, isLoading, PreviousLink, NextLink, nextPageUrl, state }) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({ node, index }),
        );

        /// Infinite scroll trigger when the user comes to it
        const nextLinkRef = useRef<HTMLAnchorElement>(null);

        useEffect(() => {
          if (nextLinkRef.current && nextPageUrl && !isLoading) {
            const observer = new IntersectionObserver(([entry]) => {
              if (entry.isIntersecting) nextLinkRef.current?.click();
            });
            observer.observe(nextLinkRef.current);
            return () => observer.disconnect();
          }
        }, [nextPageUrl, isLoading]);



        return (
          <>
            {/* <div className='flex justify-center mt-10'>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span className='BUTTON1'>Load previous</span>}
              </PreviousLink>
            </div> */}


            <div className='PRODUCTS_GRID_CONTAINER gap-y-10 w-full'>
              {resourcesClassName ? (
                <div className={resourcesClassName}>{resourcesMarkup}</div>
              ) : (
                resourcesMarkup
              )}
            </div>


            <div className='flex justify-center mt-10'>
              <NextLink ref={nextLinkRef} className='text-orange-400 font-bold animate-pulse'>
                {isLoading ? 'Loading...' : <span className='BUTTON1 opacity-100'>Load more </span>}
              </NextLink>
            </div>
          </>
        );
      }}
    </Pagination >
  );
}