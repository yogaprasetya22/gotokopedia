"use client";

import { useHandleCatalogue } from "@/hooks/use-handle-product";
import { Product } from "@/type/toko-product-type";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ProductByToko() {
    const params = useParams<{ toko_slug: string }>();
    const limit = 12;
    const [loadComments, setLoadComments] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const productByTokoRef = useRef<HTMLDivElement | null>(null);
    const { getProductsByToko } = useHandleCatalogue();
    const { data, isLoading } = getProductsByToko(
        params.toko_slug,
        1,
        limit,
        loadComments
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasLoaded) {
                    setLoadComments(true);
                    setHasLoaded(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "0px",
                threshold: 0.1,
            }
        );

        if (productByTokoRef.current) {
            observer.observe(productByTokoRef.current);
        }

        return () => {
            if (productByTokoRef) {
                observer.disconnect();
            }
        };
    }, [hasLoaded]);

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">Lainnya di toko ini</h1>
            <div
                className="grid md:grid-cols-6 grid-cols-2 gap-2 md:gap-4 content-stretch w-full"
                ref={productByTokoRef}
            >
                {data &&
                    data.map((product: Product, index: number) => (
                        <Link
                            prefetch={true}
                            key={index}
                            href={`/product/${product.toko.slug}/${product.slug}`}
                            className="rounded shadow-lg m-1 md:m-2 w-full bg-neutral-50 border"
                        >
                            <div className="w-full ">
                                <Image
                                    src={product.image_urls[0]}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-auto object-cover rounded-t-lg"
                                />
                            </div>
                            <div className="px-2 py-4 space-y-1.5">
                                <div className="truncate-2-lines text-xs text-gray-700">
                                    {product.name}
                                </div>
                                <p className="text-gray-900 font-bold md:text-md text-sm">
                                    {product.price.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                    })}
                                </p>
                                {product.is_for_sale && (
                                    <div className="space-x-1 flex items-center">
                                        <p className="text-gray-500 line-through md:text-md text-xs">
                                            {product.discount_price.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                    minimumFractionDigits: 0,
                                                }
                                            )}
                                        </p>
                                        <span className="text-red-400 text-xs font-extrabold">
                                            {product.discount}%
                                        </span>
                                    </div>
                                )}
                                <p className="text-gray-600 md:text-md text-xs flex items-center gap-1">
                                    <Image
                                        src="https://images.tokopedia.net/img/official_store/badge_os.png"
                                        alt="verified"
                                        width={20}
                                        height={20}
                                        className="w-4 h-4"
                                    />{" "}
                                    {product.toko.country.replace(
                                        /^Dikirim dari\s+/i,
                                        ""
                                    )}
                                </p>
                                {/* rating */}
                                <p className="text-xs text-gray-500 font-medium flex items-center">
                                    <svg
                                        className=" inline-block mr-1 align-middle"
                                        viewBox="0 0 24 24"
                                        width="15"
                                        height="15"
                                        fill="var(--YN300, #FFC400)"
                                    >
                                        <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                                    </svg>
                                    {Math.round(product.rating * 10) / 10} |{" "}
                                    {product.sold} Terjual
                                </p>
                            </div>
                        </Link>
                    ))}
                {isLoading &&
                    Array.from({ length: 12 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-5 rounded-lg shadow-lg m-1 md:m-2 w-full bg-neutral-100"
                        >
                            <div className="animate-pulse h-[20vh] w-full bg-gray-200/80 rounded-t-lg"></div>
                            <div className="flex flex-col p-4 gap-5">
                                <div className="animate-pulse h-3 w-36 bg-green-200 rounded-xl"></div>
                                <div className="animate-pulse h-3 w-24 bg-pink-200 rounded-xl"></div>
                                <div className="animate-pulse h-3 w-24 bg-pink-200 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
