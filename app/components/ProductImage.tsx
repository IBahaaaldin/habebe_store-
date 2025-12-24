import type { ProductVariantFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import Reviews from './MINE/Reviews';





export function ProductImage({ image, OtherImages }: { image: ProductVariantFragment['image']; OtherImages?: ProductVariantFragment['image'][]; }) {



  if (!image) {
    return <div className="product-image" />;
  }

  console.log(`%c${JSON.stringify(OtherImages)}`, 'color: red; font-size: 20px;')


  return (
    <section className="flex flex-col gap-5">
      <div className='product-image rounded-4xl overflow-hidden'>
        <Image
          alt={image.altText || 'Product Image'}
          aspectRatio="1/1"
          data={image}
          key={image.id}
          sizes="(min-width: 45em) 50vw, 100vw"
        />
      </div>




      {/* <div className='flex flex-col gap-3 max-w-full'>
        {OtherImages?.filter((imgUrl): imgUrl is NonNullable<typeof imgUrl> => !!imgUrl).map((imgUrl) => (
          <Image
            alt={imgUrl.altText || 'Product Image'}
            aspectRatio="1/1"
            data={imgUrl}
            key={imgUrl.id}
          />
        ))}
      </div> */}
    </section>
  );
}
