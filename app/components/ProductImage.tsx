import type { ProductVariantFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';




export function ProductImage({ image, OtherImages }: { image: ProductVariantFragment['image']; OtherImages?: string[]; }) {



  if (!image) {
    return <div className="product-image" />;
  }

  console.log(`%c${JSON.stringify(OtherImages)}`, 'color: red; font-size: 20px;')


  return (
    <section className="flex flex-col gap-5">
      <div className='p-3 rounded-3xl overflow-hidden
    bg-zinc-50'>
        <figure className='min-w-70 rounded-2xl overflow-hidden'>
          <Image
            alt={image.altText || 'Product Image'}
            aspectRatio="1/1"
            data={image}
            key={image.id}
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        </figure>

      </div>



      <div className='flex flex-row flex-wrap gap-3 max-w-full'>
        {OtherImages?.filter((imageData): imageData is NonNullable<typeof imageData> => !!imageData).map((image, index) => (
          <Image
            alt={'Product Image'}
            aspectRatio="1/1"
            data={image}
            key={image}
            className='min-w-30 max-w-40 aspect-square  object-cover'
          />
        ))}
      </div>
    </section>
  );
}
