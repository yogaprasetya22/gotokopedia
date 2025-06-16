"use client";

import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useCurrentToko } from "@/hooks/use-handle-api";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Toko({ params }: { params: { toko_slug: string } }) {
    const { isLoading, toko } = useCurrentToko(params.toko_slug);
    const origin: string = useOrigin();
    return (
        <div className="w-full bg-white flex justify-center">
            {isLoading ? (
                <div className=" h-[64px] w-[216px] p-2 bg-gray-300 animate-pulse"></div>
            ) : (
                toko && (
                    <div className="w-full flex flex-col max-w-[80rem] pt-5 ">
                        <div className="w-full border border-gray-300 rounded-md px-5 py-2">
                            <div className="flex flex-row gap-4 w-full justify-between py-2">
                                <div className="flex flex-row gap-4">
                                    {toko?.image_profile && (
                                        <Image
                                            src={toko.image_profile}
                                            alt="store-image"
                                            width={100}
                                            height={100}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    )}
                                    <div className="flex flex-col gap-2 py-2">
                                        <Link prefetch={true}
                                            href={`${origin}/product/${toko?.slug}`}
                                            className="text-sm text-black font-semibold flex items-center gap-2"
                                        >
                                            <Image
                                                src="https://images.tokopedia.net/img/official_store/badge_os.png"
                                                alt="verified"
                                                width={20}
                                                height={20}
                                                className="w-4 h-4"
                                            />
                                            {toko?.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 font-medium">
                                            Online{" "}
                                            <span className="text-gray-600">
                                                1 jam lalu
                                            </span>
                                            {" • "}
                                            {toko?.country.replace(
                                                /^Dikirim dari\s+/i,
                                                ""
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                            <StarIcon size={16} /> 4.8
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="border-green-600 text-green-600 font-semibold rounded-lg px-10"
                                >
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <div className="grid md:grid-cols-6 grid-cols-2 gap-2 md:gap-4 content-stretch w-full ">
                                {toko &&
                                    toko.products?.map((product, index) => (
                                        <Link prefetch={true}
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
                                                    {product.price.toLocaleString(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                            minimumFractionDigits: 0,
                                                        }
                                                    )}
                                                </p>
                                                {product.is_for_sale && (
                                                    <div className="space-x-1 flex items-center">
                                                        <p className="text-gray-500 line-through md:text-md text-xs">
                                                            {product.discount_price.toLocaleString(
                                                                "id-ID",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "IDR",
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
                                                    {Math.round(
                                                        product.rating * 10
                                                    ) / 10}{" "}
                                                    | {product.sold} Terjual
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                {isLoading &&
                                    Array.from({ length: 12 }).map(
                                        (_, index) => (
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
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
