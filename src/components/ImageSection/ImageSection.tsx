import { Skeleton } from "@src/components/ui/skeleton";
import { MODELS } from "@src/lib/contstants";
import { APIOutputType } from "@src/lib/types";
import Image from "next/image";

interface ImageSectionProps {
  images: APIOutputType[];
  loading: boolean;
}

const getModelTitle = (model: string) => {
  if (model === MODELS.DALLE) {
    return "DALL-E";
  }
  return "Gemini";
};

const ImageSection = ({ images, loading }: ImageSectionProps) => {
  console.log(images[0].model);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {loading ? (
        <>
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </>
      ) : (
        images.map((image, index) => (
          <div key={index}>
            <div key={index} className="relative h-[300px] w-full">
              <Image
                src={`data:image/png;base64,${image.image}`}
                alt={`Generated image ${index + 1}`}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="font-semibold">{getModelTitle(image.model)}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageSection;
