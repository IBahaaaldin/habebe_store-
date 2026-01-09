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
import { Share2, ShoppingBag, ShoppingCart, Star } from 'lucide-react';
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
    <article className='min-w-40 max-w-60 relative w-full h-fit items-end flex flex-col gap-3 p-2 bg-zinc-50 rounded-3xl overflow-hidden'>
      {image && (
        <Link
          className="w-full rounded-2xl overflow-hidden "
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





      {/* /// Details */}
      <article className='px-2 flex flex-col w-full justify-between items-end gap-2'>
        <h4 className='md:text-lg capitalize w-full'>{product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title}</h4>

        <div className='flex flex-row w-full justify-between items-start '>
          <Prices
            CC1='md:text-lg text-sm'
            CC2='md:text-sm text-xs'
            price={price}
            currency={currency}
          />

          <AddToCartButton
            disabled={!product?.variants.nodes[0]?.availableForSale}
            CC='w-fit md:text-xs text-xs'
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
            {/* The Sold out is hidden  from the comp itself */}
            {product?.variants.nodes[0]?.availableForSale ? <ShoppingCart size={15}/> : 'Sold out'} 
          </AddToCartButton>
        </div>
      </article>



      <Share2
        className="cursor-pointer absolute top-5 right-5 bg-white/80 backdrop-blur-xs hover:bg-white duration-300 rounded-xl z-100 text-orange-400 md:p-2 p-1.5 md:w-8 md:h-8 w-6 h-6"
        size={40}
        onClick={handleShareClick}
      />
      {showCopyMessage && (
        <div className="absolute top-6 right-17 px-3 py-1 bg-green-700/70 backdrop-blur-sm rounded-xl text-white text-sm">
          {copyMessage}
        </div>
      )}
    </article>
  );
}



// export default function Ratings({ RATING }: { RATING: number }) {
//   return (
//     <div className="text-xl flex flex-row items-center gap-2">


//       <span className="flex flex-row  gap-1">
//         <Star className="text-transparent w-7 h-7 fill-green-700" />
//       </span>


//       <small>({RATING}/5)</small>
//     </div>
//   )
// }



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