import React, { useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image"; // This is now used
import { usePrevNextButtons, useDotButton } from "@/hooks/use-carousel";
import { CarouselNext, CarouselPrevious, DotButton } from "./carousel-button";

type EmblaCarouselProps = {
    slides: { id: number; image: string }[];
    options?: EmblaOptionsType;
    autoplay?: boolean; // Opsi autoplay
    autoplayDelay?: number; // Opsi delay untuk autoplay
};

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
    slides,
    autoplay = true,
    autoplayDelay = 5000,
}) => {
    // Menyusun opsi autoplay berdasarkan props
    const autoplayOptions = autoplay
        ? [Autoplay({ playOnInit: true, delay: autoplayDelay })]
        : [];

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        autoplayOptions
    );

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const [isHovered, setIsHovered] = useState(false); // State untuk hover

    // Handlers untuk hover
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="h-full w-full flex justify-center ">
            <div
                className="relative z-40"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="embla">
                    <div
                        className="embla__viewport rounded-none md:rounded-2xl"
                        ref={emblaRef}
                    >
                        <div className="embla__container">
                            {slides.map((slide) => (
                                <div
                                    key={slide.id} // Use slide.id for better uniqueness
                                    className="embla__slide flex justify-center"
                                >
                                    <Image
                                        src={slide.image}
                                        alt={`Image ${slide.id}`}
                                        className="w-full h-auto object-cover"
                                        // fill // Mengganti layout dengan fill
                                        sizes="(max-width: 500px) 100vw, 500px" // Menambahkan sizes untuk responsivitas
                                        width={500} // Specify width
                                        height={500} // Specify height
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute w-full z-20 bottom-0 left-0 space-x-1 pl-4 pb-2">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={
                                selectedIndex === index
                                    ? "bg-white"
                                    : "bg-gray-300/80"
                            }
                        />
                    ))}
                </div>

                {/* Tombol prev/next yang muncul ketika hover */}
                <div
                    className={`absolute w-full z-20 bottom-[45%] flex justify-between transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <CarouselPrevious
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <CarouselNext
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(EmblaCarousel);
