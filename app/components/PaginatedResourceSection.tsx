import * as React from 'react';
import { Pagination } from '@shopify/hydrogen';




// <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
export function PaginatedResourceSection<NodesType>({ connection, children, resourcesClassName, }: { connection: React.ComponentProps<typeof Pagination<NodesType>>['connection']; children: React.FunctionComponent<{ node: NodesType; index: number }>; resourcesClassName?: string; }) {
  return (
    <Pagination connection={connection}>
      {({ nodes, isLoading, PreviousLink, NextLink }) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({ node, index }),
        );

        return (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[2%] gap-y-10 flex-wrap w-full items-start justify-start '>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span className='button1'>Load previous</span>}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <NextLink>
              {isLoading ? 'Loading...' : <span className='button1'>Load more </span>}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
