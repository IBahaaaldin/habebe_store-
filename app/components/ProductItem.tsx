/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { useState } from 'react';
import type {
  CollectionItemFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import Prices from './MINE/UI/Prices';
import { Share2, Star } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
// import { CartLineQuantity } from './CartLineItem';



// Get the first varient 
export function ProductItem({ product, loading }: { product: | CollectionItemFragment | any; loading?: 'eager' | 'lazy'; }) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode;



  // Handles sharing the product link
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




  return (
    <article className='relative w-full h-fit items-end flex flex-col gap-3 p-3 bg-zinc-50 rounded-4xl overflow-hidden'>
      {image && (
        <Link
          className="w-full rounded-3xl overflow-hidden "
          key={product.id}
          prefetch="intent"
          to={variantUrl}
        >
          <figure className='relative w-full h-full rounded-lg overflow-hidden '>
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
      <article className='px-2 flex flex-col w-full justify-between items-end gap-2'>
        <h4 className='md:text-xl capitalize w-full'>{product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title}</h4>

        <div className='flex flex-row w-full justify-between items-end '>
          <Prices
            price={price}
            currency={currency}
          />

          <AddToCartButton
            disabled={!product?.variants.nodes[0]?.availableForSale}
            CC='w-full scale-85'
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
            {product?.variants.nodes[0]?.availableForSale ? "Add" : 'Sold out'}
          </AddToCartButton>
        </div>
      </article>

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
        className="cursor-pointer absolute top-5 right-5 hover:bg-orange-500 duration-300 rounded-2xl z-100 bg-orange-500/50 backdrop-blur-sm text-white md:p-2.5 p-1.5 md:w-10 md:h-10 w-8 h-8"
        size={40}
        onClick={handleShareClick}
      />
      {showCopyMessage && (
        <div className="absolute top-6 right-17 px-3 py-1 bg-green-900/70 backdrop-blur-sm rounded-full text-white text-sm">
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



export const PRODUCT_FIELDS = `#graphql
  fragment ProductFields on Product {
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
`;


/*
* This is the GraphQL snippet to fetch first 5 PRODUCTS
products(first: 10) {
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
*/