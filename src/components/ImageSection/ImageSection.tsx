import { Skeleton } from "@src/components/ui/skeleton";
import Image from "next/image";

interface ImageSectionProps {
  images: string[];
  loading: boolean;
}

const ImageSection = ({ images, loading }: ImageSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {loading ? (
        <>
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </>
      ) : (
        images.map((image, index) => (
          <div key={index} className="relative h-[300px] w-full">
            <Image
              src={`data:image/png;base64,${image}`}
              alt={`Generated image ${index + 1}`}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageSection;
