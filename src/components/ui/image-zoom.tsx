"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

function SimpleImageMagnifier(
    containerElement: string | HTMLElement,
    imageElement: string | HTMLImageElement,
    imageOriginalElement: string | HTMLImageElement
): () => void {
    let zoomW: number = 1;
    let zoomH: number = 1;

    const previewBoxEl: HTMLElement | HTMLDivElement | null =
        typeof containerElement == "string"
            ? document.querySelector(containerElement)
            : containerElement;

    if (!previewBoxEl) {
        throw new Error("containerElement is not found");
    }

    const imageEl: HTMLImageElement | null =
        typeof imageElement == "string"
            ? previewBoxEl.querySelector(imageElement)
            : imageElement;

    if (!imageEl) {
        throw new Error("imageElement is not found");
    }

    const imageOriginalEl: HTMLImageElement | null =
        typeof imageOriginalElement == "string"
            ? previewBoxEl.querySelector(imageOriginalElement)
            : imageOriginalElement;

    if (!imageOriginalEl) {
        throw new Error("imageOriginalEl is not found");
    }

    const refreshImage = () => {
        if (!imageOriginalEl) {
            return;
        }

        imageOriginalEl.style.width = imageOriginalEl.naturalWidth + "px";
        imageOriginalEl.style.height = imageOriginalEl.naturalHeight + "px";

        zoomW = imageOriginalEl.naturalWidth / previewBoxEl.clientWidth - 1;
        zoomH = imageOriginalEl.naturalHeight / previewBoxEl.clientHeight - 1;
    };

    const addEvents = () => {
        imageOriginalEl.addEventListener("load", refreshImage);

        previewBoxEl.addEventListener("mouseenter", () => {
            imageEl.style.opacity = "0";
        });

        previewBoxEl.addEventListener("mouseleave", () => {
            imageEl.style.opacity = "1";
        });

        previewBoxEl.addEventListener("mousemove", (e) => {
            imageOriginalEl.style.top = -e.offsetY * zoomH + "px";
            imageOriginalEl.style.left = -e.offsetX * zoomW + "px";
        });

        window.addEventListener("resize", refreshImage);
    };

    const removeEvents = () => {
        window.removeEventListener("resize", refreshImage);
    };

    addEvents();
    refreshImage();

    return () => {
        removeEvents();
    };
}

interface ImageMagnifierProps {
    srcPreview: string;
    srcOriginal: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
    srcPreview,
    srcOriginal,
    width = "",
    height = "",
    className = "",
}) => {
    const container = useRef<HTMLDivElement>(null);
    const imgPreview = useRef<HTMLImageElement>(null);
    const imgOriginal = useRef<HTMLImageElement>(null);
    const refreshImage = useRef<() => void>(() => {});

    const showImageMagnifier = async () => {
        if (container.current && imgPreview.current && imgOriginal.current) {
            imgOriginal.current.onload = () => {
                refreshImage.current = SimpleImageMagnifier(
                    container.current as HTMLDivElement,
                    imgPreview.current as HTMLImageElement,
                    imgOriginal.current as HTMLImageElement
                );
            };

            return;
        }

        setTimeout(showImageMagnifier, 200);
    };

    useEffect(() => {
        showImageMagnifier();
    }, [showImageMagnifier]);

    useEffect(() => {
        refreshImage.current();
    }, [srcOriginal, srcPreview, width, height]);

    useEffect(() => {
        return () => {
            if (refreshImage.current) {
                refreshImage.current();
            }
        };
    }, []);

    return (
        <div
            ref={container}
            className={className}
            style={{
                position: "relative",
                overflow: "hidden",
                width: width,
                height: height,
                borderRadius: "8px",
            }}
        >
            <Image
                ref={imgPreview}
                src={srcPreview}
                alt="Preview"
                width={400}
                height={300}
                style={{
                    position: "relative",
                    zIndex: "1",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    transitionProperty: "opacity",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDuration: "300ms",
                }}
            />
            <Image
                ref={imgOriginal}
                src={srcOriginal}
                alt="Original"
                width={800}
                height={600}
                style={{ position: "absolute", maxWidth: "none" }}
            />
        </div>
    );
};

export default ImageMagnifier;
