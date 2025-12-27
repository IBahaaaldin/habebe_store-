/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { useState } from 'react';
import type {
  // ProductItemFragment,
  CollectionItemFragment,
  // RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import Prices from './MINE/UI/Prices';
import { Share2, ShoppingCart, Star } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
// import { CartLineQuantity } from './CartLineItem';



// Get the first varient 
export function ProductItem({ product, loading, }: { product: | CollectionItemFragment | any; loading?: 'eager' | 'lazy'; }) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode;


  const handleShareClick = async () => {
    try {
      const productUrl = `${window.location.origin}${variantUrl}`; // Use variantUrl here
      await navigator.clipboard.writeText(productUrl);
      setCopyMessage('Product link copied!');
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 3000); // Hide after 3 seconds
    } catch (err) {
      setCopyMessage('Failed to copy link.');
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 3000);
      console.error('Failed to copy product link: ', err);
    }
  };


  // console.log(`%c${JSON.stringify(product)}`, 'color: pink; font-size: 20px;')


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

          {/* /// Add to cart */}
          <AddToCartButton
            disabled={!product?.variants.nodes[0]?.availableForSale}
            CC='w-full'
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
            {product?.variants.nodes[0]?.availableForSale ? <ShoppingCart className='w-12 h-12 p-3 hover:bg-zinc-100 bg-white rounded-full duration-300 cursor-pointer' /> : 'Sold out'}
          </AddToCartButton>
        </Link>
      </div>


      {/* <div className='flex flex-row flex-wrap w-full justify-between items-end'>
        {[
          { name: 'Stock', value: 500 },
          { name: 'Sold', value: 200 }
        ].map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-2">
            <p><span className='text-zinc-500'>{item.name}:</span> {item.value}</p>
          </div>
        ))}
      </div> */}



      {/* <div className='absolute top-5 right-5'> */}
      <Share2
        className="cursor-pointer absolute top-5 left-5 p-2 hover:bg-zinc-200 duration-300 rounded-full z-100 bg-white text-zinc-700  w-9 h-9"
        size={40}
        onClick={handleShareClick}
      />
      {showCopyMessage && (
        <div className="absolute top-15 left-5 px-3 py-1 bg-green-500 text-white rounded-md text-sm">
          {copyMessage}
        </div>
      )}
      {/* </div> */}
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