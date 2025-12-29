import type { ProductVariantFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import { useState } from 'react';



export function ProductImage({ image, OtherImages }: { image: ProductVariantFragment['image']; OtherImages?: string[]; }) {
  const [mainImage, setMainImage] = useState(image);




  const handleMouseEnter = (hoveredImage: ProductVariantFragment['image']) => {
    setMainImage(hoveredImage);
  };

  const handleMouseLeave = () => {
    setMainImage(image); // Revert to the original main image
  };

  return (
    <section className="flex flex-col gap-5 w-full">
      <figure className='p-3 rounded-3xl overflow-hidden
    bg-zinc-50 min-w-70 w-full aspect-square'>
        <Image
          alt={mainImage?.altText || 'Product Image'}
          aspectRatio="1/1"
          data={mainImage}
          key={mainImage?.id}
        />
      </figure>


      {/* Sub Images */}
      <div className='flex flex-row gap-3 overflow-scroll HIDDEN_SCROLL max-w-2xl'>
        {OtherImages?.filter((imageData): imageData is NonNullable<typeof imageData> => !!imageData).map((imgData) => (
          <figure key={imgData} className='min-w-25 max-w-25 rounded-2xl p-2 bg-zinc-50 aspect-square overflow-hidden'
            onMouseEnter={() => handleMouseEnter(imgData as ProductVariantFragment['image'])}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              alt={'Product Image'}
              aspectRatio="1/1"
              data={imgData}
              className='object-cover'
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
