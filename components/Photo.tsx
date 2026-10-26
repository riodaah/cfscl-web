import Image from "next/image";

type Props = {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Foto optimizada desde /public/media. El fondo verde cubre mientras carga. */
export default function Photo({ name, alt, className = "", sizes = "100vw", priority }: Props) {
  return (
    <div className={`relative overflow-hidden bg-huerto-2 ${className}`}>
      <Image
        src={`/media/${name}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={75}
        className="object-cover"
      />
    </div>
  );
}
