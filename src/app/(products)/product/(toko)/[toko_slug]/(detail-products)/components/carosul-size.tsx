import Image from "next/image";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
const Carousel = dynamic(() => import("@/components/ui/carousel").then(mod => mod.Carousel), { ssr: false });
const CarouselContent = dynamic(() => import("@/components/ui/carousel").then(mod => mod.CarouselContent), { ssr: false });
const CarouselItem = dynamic(() => import("@/components/ui/carousel").then(mod => mod.CarouselItem), { ssr: false });
const CarouselNext = dynamic(() => import("@/components/ui/carousel").then(mod => mod.CarouselNext), { ssr: false });
const CarouselPrevious = dynamic(() => import("@/components/ui/carousel").then(mod => mod.CarouselPrevious), { ssr: false });

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

export function CarouselSize({
    images,
    onImageClick,
}: {
    images: string[];
    onImageClick: (src: string) => void;
}) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0); // State untuk melacak gambar aktif

    // Handlers untuk hover
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleImageClick = (src: string, index: number) => {
        onImageClick(src);
        setCurrentImageIndex(index); // Update gambar yang sedang aktif
    };

    return (
        <>
            {images.length > 5 ? (
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index} className="basis-1/5">
                                <div
                                    className="cursor-pointer "
                                    onClick={() => handleImageClick(src, index)} // Update current image index
                                >
                                    <Card>
                                        <CardContent
                                            className={cn(
                                                " p-0",
                                                index === currentImageIndex
                                                    ? "rounded-md border-2 border-green-500"
                                                    : "" // Border hijau jika aktif
                                            )}
                                        >
                                            <Image
                                                src={src.replace(
                                                    "500-square",
                                                    "100-square"
                                                )}
                                                alt={`Image ${index + 1}`}
                                                width={80}
                                                height={80}
                                                className="w-full object-contain rounded-md"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div
                        className={`absolute w-[100%] h-0 z-20 top-1/2 flex justify-between transition-opacity duration-300 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <CarouselPrevious variant="default" />
                        <CarouselNext variant="default" />
                    </div>
                </Carousel>
            ) : (
                <div className="flex justify-start items-start w-full max-w-[24rem] space-x-2">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => handleImageClick(src, index)}
                        >
                            <Card>
                                <CardContent
                                    className={cn(
                                        " p-0",
                                        index === currentImageIndex
                                            ? "rounded-md border-2 border-green-500"
                                            : ""
                                    )}
                                >
                                    <Image
                                        loading="lazy"
                                        src={src.replace(
                                            "500-square",
                                            "100-square"
                                        )}
                                        alt={`Image ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-[4.5rem] object-cover rounded-md"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
