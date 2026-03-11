// /* eslint-disable eslint-comments/disable-enable-pair */
// /* eslint-disable @typescript-eslint/no-misused-promises */
// import type { ProductVariantFragment } from 'storefrontapi.generated';
// import { Image } from '@shopify/hydrogen';
// import { useEffect, useState } from 'react';
// import { Share2 } from 'lucide-react';
// import { useLocation } from 'react-router';
// import { SliderButtons } from './MINE/ReUsable/Buttons';



// export function ProductImage({ image, productMedia, selectedVariant }: { image: ProductVariantFragment['image']; productMedia?: any, selectedVariant?: ProductVariantFragment; }) {


//   // Handlers for hovering over sub images to change main image
//   const [mainImage, setMainImage] = useState(image);

//   const handleMouseEnter = (hoveredImage: ProductVariantFragment['image']) => {
//     setMainImage(hoveredImage);
//   };

//   const handleMouseLeave = () => {
//     setMainImage(selectedVariant?.image || image); // Revert to the original main image
//   };




//   /// Change the main image to fetch the new product's main image
//   const location = useLocation()

//   useEffect(() => {
//     setMainImage(image); // Revert to the original main image
//   }, [image, location.pathname])


//   /// 
//   const [showCopyMessage, setShowCopyMessage] = useState(false);
//   const [copyMessage, setCopyMessage] = useState('');


//   const handleShareClick = async () => {
//     try {
//       const productUrl = window.location.href; // Use variantUrl here
//       await navigator.clipboard.writeText(productUrl);
//       setCopyMessage('Product link copied!');
//       setShowCopyMessage(true);
//       setTimeout(() => setShowCopyMessage(false), 3000); // Hide after 3 seconds
//     } catch (err) {
//       setCopyMessage('Failed to copy link.');
//       setShowCopyMessage(true);
//       setTimeout(() => setShowCopyMessage(false), 3000);
//       console.error('Failed to copy product link: ', err);
//     }
//   };


//   return (
//     <section className="flex flex-col gap-3 w-full md:max-w-1/2">
//       <figure className='relative p-2 md:rounded-3xl rounded-2xl overflow-hidden
//     bg-zinc-50 w-full aspect-square h-fit'>
//         <Image
//           alt={mainImage?.altText || 'Product Image'}
//           data={selectedVariant?.image || mainImage!}
//           key={mainImage?.id}
//           className='w-full h-full z-0 md:rounded-2xl rounded-xl robject-cover aspect-square'
//           sizes='100vw'
//         />
//         <Image
//           alt={mainImage?.altText || 'Product Image'}
//           data={mainImage!}
//           key={mainImage?.id}
//           className='w-full h-full z-1 md:rounded-2xl rounded-xl robject-cover aspect-square'
//           sizes='100vw'
//         />



//         <Share2
//           className="cursor-pointer absolute top-5 right-5 bg-white backdrop-blur-xs hover:bg-white/80 duration-300 rounded-lg z-100 text-orange-400 p-1.5 "
//           size={35}
//           onClick={handleShareClick}
//         />
//         {showCopyMessage && (
//           <span className="absolute md:top-5 md:right-16 top-17 right-5 max-w-[80%] px-3 py-1 bg-white rounded-lg text-black">
//             {copyMessage}
//           </span>
//         )}
//       </figure>



//       {/* Sub Images */}
//       <div className='relative flex flex-row gap-3 overflow-x-scroll HIDDEN_SCROLL w-full' >
//         {productMedia?.map((imgData: any, index: number) => (
//           <figure
//             key={index}
//             className='min-w-25 md:rounded-2xl rounded-xl p-1.5 bg-zinc-50 aspect-square overflow-hidden cursor-pointer border border-black/0 
//               hover:border-black active:border-black hover:brightness-60 active:brightness-60 duration-300 '
//             onMouseEnter={() => handleMouseEnter(imgData.node.image as any)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Image
//               alt={imgData?.altText || ""}
//               data={imgData.node?.image}
//               className='object-cover rounded-lg w-full h-full'
//               sizes='100px'
//             />
//           </figure>
//         ))}

//         {/* <SliderButtons itemsToShow={5} changeIndex={() => { }} passedArray={productMedia} /> */}
//       </div>
//     </section>
//   );
// }
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { ProductVariantFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';

export function ProductImage({
  image,
  productMedia,
  selectedVariant
}: {
  image: ProductVariantFragment['image'];
  productMedia?: any;
  selectedVariant?: ProductVariantFragment;
}) {
  const [mounted, setMounted] = useState(false);
  const [mainImage, setMainImage] = useState(selectedVariant?.image || image);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update main image whenever the selected variant changes
  useEffect(() => {
    setMainImage(selectedVariant?.image || image);
  }, [selectedVariant, image]);

  const handleMouseEnter = (hoveredImage: any) => {
    setMainImage(hoveredImage);
  };

  const handleMouseLeave = () => {
    setMainImage(selectedVariant?.image || image);
  };

  const handleShareClick = async () => {
    if (!mounted) return; // Don't run on server

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage('Product link copied!');
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 3000);
    } catch (err) {
      setCopyMessage('Failed to copy link.');
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 3000);
    }
  };

  return (
    <section className="flex flex-col gap-3 w-full md:max-w-1/2">
      {/* Main Image Display */}
      <figure className="relative p-2 md:rounded-3xl rounded-2xl overflow-hidden bg-zinc-50 w-full aspect-square h-fit">
        <Image
          alt={mainImage?.altText || 'Product Image'}
          data={mainImage!}
          key={mainImage?.id}
          className="w-full h-full md:rounded-2xl rounded-xl object-cover aspect-square transition-opacity duration-300"
          sizes="70vw"
        />

        {/* Only render interactive elements after mounting */}
        {mounted && (
          <>
            <Share2
              className="cursor-pointer absolute top-5 right-5 bg-white/90 backdrop-blur-sm hover:bg-white duration-300 rounded-lg z-10 text-orange-400 p-1.5 shadow-sm"
              size={35}
              onClick={handleShareClick}
            />

            {showCopyMessage && (
              <span className="absolute md:top-5 md:right-16 top-17 right-5 px-3 py-1 bg-white rounded-lg text-black text-sm shadow-md z-20">
                {copyMessage}
              </span>
            )}
          </>
        )}

        {/* Optional: Show a placeholder during SSR */}
        {!mounted && (
          <div className="absolute top-5 right-5 w-[35px] h-[35px] rounded-lg bg-white/90" />
        )}
      </figure>

      {/* Thumbnail Gallery */}
      <div className="relative flex flex-row gap-3 overflow-x-scroll ROW_SCROLL w-full">
        {productMedia?.map((imgData: any, index: number) => (
          <figure
            key={imgData.node?.image?.id || index}
            className="min-w-25 md:rounded-2xl rounded-xl p-1.5 bg-zinc-50 aspect-square overflow-hidden cursor-pointer border-2 border-transparent hover:border-black transition-all duration-200 hover:brightness-70 active:brightness-70"
            onMouseEnter={() => handleMouseEnter(imgData.node.image)}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              alt={imgData.node?.image?.altText || ""}
              data={imgData.node?.image}
              className="object-cover rounded-lg w-full h-full"
              sizes="100px"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}