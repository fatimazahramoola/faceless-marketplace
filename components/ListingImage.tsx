import Image from "next/image";

type ListingImageProps = {
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function ListingImage({
  src,
  alt,
  priority = false,
  className = "",
}: ListingImageProps) {
  if (!src) {
    return (
      <div
        className={`flex aspect-square items-center justify-center bg-[#F4F1FF] text-sm font-semibold text-[#7B3FE4] ${className}`}
      >
        No image
      </div>
    );
  }

  return (
    <div className={`relative aspect-square overflow-hidden bg-neutral-100 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
