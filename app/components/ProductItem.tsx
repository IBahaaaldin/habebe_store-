/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { useMemo, useState } from 'react';
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
  // console.log(`%c${JSON.stringify(secondImage, null, 3)}`, 'color: green; font-size: 20px;')


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




  // badges.ts
  const fakeBadges = [
    {
      label: "Best Seller",
      bg: "bg-yellow-500/50",
      text: "text-white",
    },
    {
      label: "Hot Deal",
      bg: "bg-red-500/50",
      text: "text-white",
    },
    {
      label: "New Arrival",
      bg: "bg-emerald-500/50",
      text: "text-white",
    },
    {
      label: "Trending",
      bg: "bg-purple-500/50",
      text: "text-white",
    },
    {
      label: "Limited Stock",
      bg: "bg-orange-500/50",
      text: "text-white",
    }
  ] as const;

  // const randomBadgeIndex = Math.floor(Math.random() * fakeBadges.length);
  const randomBadgeIndex = useMemo(() => Math.floor(Math.random() * fakeBadges.length), [])
  const badge = fakeBadges[randomBadgeIndex];


  return (
    <article className='flex-1 relative h-fit items-end flex flex-col gap-3 md:p-3 p-2 bg-zinc-100 md:rounded-3xl rounded-2xl overflow-hidden'>
      {image && (
        <Link
          className="relative w-full md:rounded-2xl rounded-xl overflow-hidden"
          key={product.id}
          prefetch="intent"
          to={variantUrl}
          onMouseEnter={() => setDisplayImage(secondImage)}
          onMouseLeave={() => setDisplayImage(image)}
        >
          <Image
            alt={image.altText || ""}
            aspectRatio="1/1"
            data={displayImage}
            loading={loading}
            className='object-cover min-h-40'
          />


          <span
            className={`
                absolute top-3 left-3 px-3 py-0.5 rounded-full font-thin backdrop-blur-sm
                ${badge.bg} ${badge.text} border-b-2 border-l-2 border-white/20
          `}
          >
            {badge.label}
          </span>
        </Link>
      )}





      {/* /// Details */}
      <article className='px-2 pb-2 flex flex-col w-full justify-between items-end gap-2'>
        <Link to={variantUrl} className='flex w-full hover:underline'>
          <h6 className='capitalize w-full'>{product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title}</h6>
        </Link>

        <div className='flex flex-row w-full justify-between items-start '>
          <Prices
            price={price}
            currency={currency}
          />

        </div>

        <AddToCartButton
          disabled={!product?.variants.nodes[0]?.availableForSale}
          CC='w-full'
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
          {product?.variants.nodes[0]?.availableForSale ? <div className='flex gap-2'><ShoppingCart size={20} /> Add</div> : 'Sold'}
        </AddToCartButton>
      </article>



      <Share2
        className="cursor-pointer absolute top-5 right-5 bg-white/80 backdrop-blur-xs hover:bg-white duration-300 rounded-lg z-100 text-orange-400 p-1.5 w-8 h-8"
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