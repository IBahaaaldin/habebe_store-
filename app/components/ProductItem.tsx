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
import { getAdjacentAndFirstAvailableVariants, getProductOptions, Image, useOptimisticVariant, useSelectedOptionInUrlParam } from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import Prices from './MINE/UI/Prices';
import { Star } from 'lucide-react';



export function ProductItem({ product, loading, }: { product: | CollectionItemFragment | ProductItemFragment | RecommendedProductFragment; loading?: 'eager' | 'lazy'; }) {


  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode;

  // console.log(`%c${JSON.stringify(product.featuredImage)}`, 'color: red; font-size: 20px;')
  // console.log(`%c${JSON.stringify(price)}`, 'color: red; font-size: 20px;')

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });


  return (
    <div className='flex flex-col gap-3'>
      {image && (
        <Link
          className="min-w-55 lg:rounded-xl rounded-lg overflow-hidden"
          key={product.id}
          prefetch="intent"
          to={variantUrl}
        >
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            className='hover:scale-105 duration-300'
          />
        </Link>
      )}
      <h4 className='lg:text-lg text-md capitalize font-bold'>{product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}</h4>
      {/* <Money data={product.priceRange.minVariantPrice} /> */}


      <div className='flex flex-col gap-2'>
        <Ratings RATING={3.7} />

        <Prices
          price={price}
          currency={currency}
        />
      </div>
    </div>
  );
}



export default function Ratings({ RATING }: { RATING: number }) {
  return (
    <div className="text-xl flex flex-row items-center gap-2">


      <span className="flex flex-row  gap-1">
        <Star className="text-transparent w-7 h-7 fill-green-500" />
      </span>


      <small>({RATING}/5)</small>
    </div>
  )
}
