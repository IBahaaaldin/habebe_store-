// import { Link } from 'react-router';
// import { Image, Money } from '@shopify/hydrogen';
// import type {
//   ProductItemFragment,
//   CollectionItemFragment,
//   RecommendedProductFragment,
// } from 'storefrontapi.generated';
// import { useVariantUrl } from '~/lib/variants';



// export function ProductItem({ product, loading, }: { product: | CollectionItemFragment | ProductItemFragment | RecommendedProductFragment; loading?: 'eager' | 'lazy'; }) {


//   const variantUrl = useVariantUrl(product.handle);
//   const image = product.featuredImage;


//   return (
//     <Link
//       className="product-item"
//       key={product.id}
//       prefetch="intent"
//       to={variantUrl}
//     >
//       {image && (
//         <Image
//           alt={image.altText || product.title}
//           aspectRatio="1/1"
//           data={image}
//           loading={loading}
//           sizes="(min-width: 45em) 400px, 100vw"
//         />
//       )}
//       <h4>{product.title}</h4>
//       <small>
//         <Money data={product.priceRange.minVariantPrice} />
//       </small>
//     </Link>
//   );
// }



import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import Prices from './MINE/UI/Prices';
import { Star, StarHalf } from 'lucide-react';



export function ProductItem({ product, loading, }: { product: | CollectionItemFragment | ProductItemFragment | RecommendedProductFragment; loading?: 'eager' | 'lazy'; }) {


  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;


  return (
    <Link
      className="product-item min-w-80"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <div className='rounded-4xl overflow-hidden'>
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            className='hover:scale-105 duration-300'
          />
        </div>
      )}
      <h4 className='pt-3 text-2xl uppercase'>{product.title}</h4>
      {/* <Money data={product.priceRange.minVariantPrice} /> */}


      <div className='flex flex-col gap-2'>
        <Ratings RATING={3.7} />

        <Prices price={product.priceRange.minVariantPrice.amount} currency={product.priceRange.minVariantPrice.currencyCode} />
      </div>
    </Link>
  );
}



export default function Ratings({ RATING }: { RATING: number }) {
  return (
    <div className="text-xl flex flex-row items-center gap-2">


      <span className="flex flex-row  gap-1">
        {[...Array(5)].map((_, i: number) => {
          const rating = i + 1;               // 1,2,3,4,5
          if (RATING >= rating) {
            return <Star key={i} className="text-transparent w-7 h-7 fill-yellow-400" />;
          }
          if (RATING >= rating - 0.5) {
            return <StarHalf key={i} className="text-transparent w-7 h-7 fill-yellow-400" />;
          }
          return <Star key={i} className="w-7 h-7 text-transparent" />;
        })}
      </span>


      <small>{RATING}<span className='text-zinc-400'>/5</span></small>
    </div>
  )
}
