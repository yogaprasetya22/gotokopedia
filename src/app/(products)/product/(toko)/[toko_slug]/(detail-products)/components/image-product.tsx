import SimpleImageMagnifier from "@/components/ui/image-zoom";
import { Product } from "@/type/toko-product-type";
import dynamic from "next/dynamic";
const CarouselSize = dynamic(
    () => import("./carosul-size").then((mod) => mod.CarouselSize),
    { ssr: false }
);

interface ImageProductProps {
    product: Product;
    mainImage: string | undefined;
    handleImageClick: (src: string) => void;
}

export default function ImageProduct({
    product,
    mainImage,
    handleImageClick,
}: ImageProductProps) {
    return (
        <aside className="w-full md:max-w-[40%]">
            <div className="flex flex-col items-center gap-2 sticky top-[70px] select-none">
                {mainImage && (
                    <SimpleImageMagnifier
                        srcPreview={mainImage}
                        srcOriginal={mainImage}
                        width="100%"
                        height="auto"
                        className="w-full object-contain"
                    />
                )}
                {product.image_urls && (
                    <div className="mx-4 md:mx-0">
                        <CarouselSize
                            images={product.image_urls}
                            onImageClick={handleImageClick}
                        />
                    </div>
                )}
            </div>
        </aside>
    );
}
