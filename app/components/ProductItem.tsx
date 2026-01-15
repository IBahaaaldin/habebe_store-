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
import { Share2, ShoppingCart } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';



// Get the first varient 
export function ProductItem({ product, loading }: { product: | CollectionItemFragment | any; loading?: 'eager' | 'lazy'; }) {
  const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false);
  const [copyMessage, setCopyMessage] = useState<string>('');

  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage; // Main Image
  const secondImage = product?.media?.nodes[1]?.image // Second Image only in the media
  console.log(`%c${JSON.stringify(secondImage, null, 3)}`, 'color: white; font-size: 20px;')

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




  /// Change the image when hover
  const [displayImage, setDisplayImage] = useState(image)


  return (
    <article className='w-full max-w-40 min-w-35 relative h-fit items-end flex flex-col gap-3 md:p-2 p-1 bg-zinc-50 md:rounded-2xl rounded-xl overflow-hidden'>
      {image && (
        <Link
          className="w-full md:rounded-2xl rounded-xl overflow-hidden"
          key={product.id}
          prefetch="intent"
          to={variantUrl}
          onMouseEnter={() => setDisplayImage(secondImage)}
          onMouseLeave={() => setDisplayImage(image)}
        >
          <Image
            // alt={image.altText || product.title}
            aspectRatio="1/1"
            data={secondImage}
            loading={loading}
            className='object-cover min-h-40'
          />
        </Link>
      )}





      {/* /// Details */}
      <article className='px-2 pb-2 flex flex-col w-full justify-between items-end gap-2'>
        <Link to={variantUrl} className='flex w-full hover:underline'>
          <span className='capitalize w-full'>{product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title}</span>
        </Link>

        <div className='flex flex-row w-full justify-between items-start '>
          <Prices
            CC1='text-xs'
            price={price}
            currency={currency}
          />

          <AddToCartButton
            disabled={!product?.variants.nodes[0]?.availableForSale}
            CC='w-fit'
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
            {product?.variants.nodes[0]?.availableForSale ? <ShoppingCart size={15} /> : 'Sold'}
          </AddToCartButton>
        </div>
      </article>



      <Share2
        className="cursor-pointer absolute top-4 right-4 bg-white/80 backdrop-blur-xs hover:bg-white duration-300 rounded-lg z-100 text-orange-400 p-1.5 w-7 h-7"
        size={40}
        onClick={handleShareClick}
      />
      {showCopyMessage && (
        <span className="absolute top-15 left-5 max-w-[80%] px-3 py-1 bg-green-700/70 backdrop-blur-sm rounded-lg text-white">
          {copyMessage}
        </span>
      )}
    </article>
  );
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