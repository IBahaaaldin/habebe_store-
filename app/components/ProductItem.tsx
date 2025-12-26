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
  // ProductItemFragment,
  CollectionItemFragment,
  // RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import Prices from './MINE/UI/Prices';
import { ArrowUpRight, ShoppingBag, ShoppingCart, Star } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { CartLineQuantity } from './CartLineItem';


// Get the first varient 

export function ProductItem({ product, loading, }: { product: | CollectionItemFragment | any; loading?: 'eager' | 'lazy'; }) {


  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode;


  console.log(`%c${JSON.stringify(product)}`, 'color: pink; font-size: 20px;')


  return (
    <article className='relative w-full h-fit items-end flex flex-col gap-3 p-3 bg-zinc-50 rounded-3xl overflow-hidden'>
      {image && (
        <Link
          className="w-full rounded-xl overflow-hidden "
          key={product.id}
          prefetch="intent"
          to={variantUrl}
        >
          <figure className='relative w-full h-full rounded-lg overflow-hidden'>
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              className='hover:scale-105 duration-300'
            />
          </figure>
        </Link>
      )}



      {/* /// Details */}
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-col'>
          <h4 className='md:text-xl capitalize'>{product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title}</h4>
          {/* <Money data={product.priceRange.minVariantPrice} /> */}


          <Prices
            price={price}
            currency={currency}
          />
        </div>

        <Link
          key={product.id}
          prefetch="intent"
          to={variantUrl}
        >
          <ArrowUpRight className="p-2 hover:bg-zinc-200 duration-300 rounded-full z-100 bg-white text-zinc-700 " size={40} />
        </Link>
      </div>


      <div className='flex flex-row flex-wrap w-full justify-between items-end'>
        {[
          { name: 'Stock', value: 500 },
          { name: 'Sold', value: 200 }
        ].map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-2">
            <p><span className='text-zinc-500'>{item.name}:</span> {item.value}</p>
          </div>
        ))}
      </div>


      <AddToCartButton
        disabled={!product?.variants.nodes[0]?.availableForSale}
        CC='w-fit'
        // onClick={() => {
        //   open('cart');
        // }}
        lines={
          product?.variants.nodes[0]
            ? [
              {
                merchandiseId: product?.variants.nodes[0].id,
                quantity: 1,
                // The Varient itself should be passed here
              }
            ]
            : []
        }
      >
        {product?.variants.nodes[0]?.availableForSale ? <ShoppingCart size={20} /> : 'Sold out'}
      </AddToCartButton>
      {/* <CartLineQuantity line={line} /> */}
    </article>
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



/*
*
query {
  collections(first: 5) {
    edges {
      node {
        id
        title
        handle
        products(first: 5) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                id
                url
                altText
                width
                height
              }
              # Add variants to get stock information
              variants(first: 5) {
                nodes {
                  id
                  availableForSale
                  title
                  sku
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
*/