import type { ProductVariantFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { useLocation } from 'react-router';



export function ProductImage({ image, OtherImages }: { image: ProductVariantFragment['image']; OtherImages?: ProductVariantFragment['image'][]; }) {


  // Handlers for hovering over sub images to change main image
  const [mainImage, setMainImage] = useState(image);

  const handleMouseEnter = (hoveredImage: ProductVariantFragment['image']) => {
    setMainImage(hoveredImage);
  };

  const handleMouseLeave = () => {
    setMainImage(image); // Revert to the original main image
  };




  /// Change the main image to fetch the new product's main image
  const location = useLocation()

  useEffect(() => {
    setMainImage(image); // Revert to the original main image
  }, [location.pathname])


  /// 
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');


  const handleShareClick = async () => {
    try {
      const productUrl = window.location.href; // Use variantUrl here
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
    <section className="flex flex-col gap-5 w-full">
      <figure className='relative p-2 md:rounded-2xl rounded-xl overflow-hidden
    bg-zinc-50 min-w-70 w-full h-fit'>
        <Image
          alt={mainImage?.altText || 'Product Image'}
          data={mainImage!}
          key={mainImage?.id}
          className='z-0 rounded-2xl overflow-hidden object-cover max-h-[70vh]'
        />



        <Share2
          className="cursor-pointer absolute top-5 right-5 hover:bg-orange-400 duration-300 rounded-lg z-100 bg-orange-400 backdrop-blur-sm text-white md:p-2.5 p-1.5 md:w-10 md:h-10 w-8 h-8"
          size={40}
          onClick={() => void handleShareClick()}
        />


        {showCopyMessage && (
          <div className="absolute top-6 right-17 px-3 py-1 bg-green-700/70 backdrop-blur-sm rounded-full text-white text-sm">
            {copyMessage}
          </div>
        )}
      </figure>



      {/* Sub Images */}
      <div className='flex flex-row gap-3 overflow-scroll HIDDEN_SCROLL max-w-2xl' >
        {OtherImages?.map((imgData) => (
          <figure key={imgData?.id} className='min-w-25 max-w-25 rounded-xl p-1.5 bg-zinc-50 aspect-square overflow-hidden'
            onMouseEnter={() => handleMouseEnter(imgData as any)}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              alt={imgData?.altText || 'Product Image'}
              aspectRatio="1/1"
              data={imgData!}
              className='object-cover rounded-lg'
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
