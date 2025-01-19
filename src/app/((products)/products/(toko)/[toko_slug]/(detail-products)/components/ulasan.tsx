"use client";

import { Progress } from "@/components/ui/progress";
import { useCurrentCommentProduct } from "@/hooks/use-handle-api";
import { TypeComment, TypeDetailProduct } from "@/type/utils-type";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { ModalComment } from "./modal-comment";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface UlasanProps {
    product: TypeDetailProduct;
}

export default function Ulasan({ product }: UlasanProps) {
    const [page, setPage] = useState(1);
    const limit = 5;
    const [reting, setRating] = useState(0);
    const [loadComments, setLoadComments] = useState(false);
    const ulasanRef = useRef<HTMLDivElement | null>(null);

    // API call hanya dilakukan saat loadComments bernilai true
    const { data, isLoading } = useCurrentCommentProduct(
        product.slug,
        page,
        limit,
        reting,
        loadComments
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoadComments(true);
                }
            },
            { rootMargin: "0px", threshold: 0.1 }
        );

        if (ulasanRef.current) observer.observe(ulasanRef.current);

        return () => observer.disconnect();
    }, []); // Dependency array diubah agar observer lebih reaktif hanya jika ulasanRef berubah.

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">Ulasan Pembeli</h1>
            <ModalComment id={product.id} />
            <div className="w-full gap-10 border rounded-md p-5 flex justify-between ">
                <div className="w-full flex flex-col gap-2 ">
                    <div className="inline-flex ">
                        <span className="-mt-1">
                            <svg
                                className=" inline-block mr-2 align-middle"
                                viewBox="0 0 24 24"
                                width="45"
                                height="45"
                                fill="var(--YN300, #FFC400)"
                            >
                                <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                            </svg>
                        </span>
                        <p className="text-2xl text-black font-extrabold">
                            {Math.round(product.rating * 10) / 10}
                        </p>
                    </div>
                    <p className="text-md text-gray-800 font-medium">
                        100% Pembeli merasa puas
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                        {product.ulasan.total_rating} rating •{" "}
                        {product.ulasan.total_ulasan} ulasan
                    </p>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <RatingProgress
                        total={product.ulasan.total_ulasan}
                        value={product.ulasan.rating_breakdown[5]}
                        bintang="5"
                    />
                    <RatingProgress
                        total={product.ulasan.total_ulasan}
                        value={product.ulasan.rating_breakdown[4]}
                        bintang="4"
                    />
                    <RatingProgress
                        total={product.ulasan.total_ulasan}
                        value={product.ulasan.rating_breakdown[3]}
                        bintang="3"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <RatingProgress
                        total={product.ulasan.total_ulasan}
                        value={product.ulasan.rating_breakdown[2]}
                        bintang="2"
                    />
                    <RatingProgress
                        total={product.ulasan.total_ulasan}
                        value={product.ulasan.rating_breakdown[1]}
                        bintang="1"
                    />
                </div>
            </div>
            <div className="flex flex-row gap-2">
                {/* filter */}
                <aside className="w-full md:max-w-[25%]">
                    <div className="flex flex-col items-center sticky top-[70px] select-none border h-[35rem] rounded-sm">
                        <div className="py-2 px-4 w-full bg-white border-b">
                            <p className="text-md text-black font-semibold uppercase">
                                Filter Ulasan
                            </p>
                        </div>
                        <div className="w-full p-4 bg-white border-b">
                            <p className="text-md text-black font-semibold">
                                Rating
                            </p>
                            <div className="flex flex-col gap-4 pt-3">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-row items-center gap-1"
                                    >
                                        <Checkbox
                                            id={`rating-${5 - i}`}
                                            disabled={
                                                product.ulasan.rating_breakdown[
                                                    i + 1
                                                ] === undefined
                                                    ? true
                                                    : false
                                            }
                                            checked={reting === 5 - i}
                                            onCheckedChange={() => {
                                                setRating(5 - i);
                                                setPage(1);
                                                setLoadComments(true);
                                            }}
                                        />
                                        <label
                                            htmlFor={`rating-${5 - i}`}
                                            className={cn(
                                                "text-sm text-gray-500 font-medium",
                                                product.ulasan.rating_breakdown[
                                                    i + 1
                                                ] === undefined
                                                    ? "text-gray-400"
                                                    : ""
                                            )}
                                        >
                                            <span className="-mr-1">
                                                <svg
                                                    className="inline-block mr-2 align-middle"
                                                    viewBox="0 0 24 24"
                                                    width="20"
                                                    height="20"
                                                    fill={
                                                        product.ulasan
                                                            .rating_breakdown[
                                                            i + 1
                                                        ] !== undefined
                                                            ? "var(--YN300, #FFC400)"
                                                            : "var(--N300, #D6DFEB)"
                                                    }
                                                >
                                                    <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                                                </svg>
                                            </span>
                                            {5 - i}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
                <div
                    ref={ulasanRef}
                    className="w-full md:max-w-[70%] flex flex-col gap-2 relative pb-14"
                >
                    {isLoading
                        ? Skeleton()
                        : data &&
                          data.comment.map(
                              (comment: TypeComment, index: number) => (
                                  <div
                                      key={index}
                                      className="w-full bg-white border-b p-5 flex flex-col gap-2"
                                  >
                                      <div className="inline-flex items-center">
                                          {Array.from({ length: 5 }, (_, i) => (
                                              <svg
                                                  key={i}
                                                  className=" inline-block align-middle"
                                                  viewBox="0 0 24 24"
                                                  width="20"
                                                  height="20"
                                                  fill={
                                                      i < comment.rating
                                                          ? "var(--YN300, #FFC400)"
                                                          : "var(--N300, #BDBDBD)"
                                                  }
                                              >
                                                  <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                                              </svg>
                                          ))}
                                          <p className="text-sm text-gray-500 font-medium ml-2">
                                              {formatDistanceToNow(
                                                  new Date(comment.created_at),
                                                  { addSuffix: true, locale: localeId }
                                              )}
                                          </p>
                                      </div>
                                      <div className="flex flex-row gap-2 items-center">
                                          <div className="flex items-center gap-2">
                                              <Image
                                                  src={`${comment.user.picture}`}
                                                  alt={comment.user.username}
                                                  width={100}
                                                  height={100}
                                                  className="w-8 h-8 rounded-full border object-contain"
                                              />
                                              <p className="text-md text-black font-semibold">
                                                  {comment.user.username}
                                              </p>
                                          </div>
                                      </div>
                                      <p className="text-sm text-gray-500 font-medium">
                                          varian
                                      </p>
                                      <p className="text-md text-black font-medium">
                                          {comment.content}
                                      </p>
                                  </div>
                              )
                          )}
                    <div className="absolute bottom-0 w-full flex justify-between items-center mt-4">
                        <button
                            className="px-4 py-2 border rounded disabled:opacity-50"
                            disabled={page === 1}
                            onClick={() => {
                                setPage((prev) => Math.max(prev - 1, 1));
                                window.scrollTo({
                                    top: 895,
                                });
                            }}
                        >
                            Previous
                        </button>

                        <p className="text-sm ">
                            Page {page} of {data?.total_page || 1}
                        </p>

                        <button
                            className="px-4 py-2 border rounded disabled:opacity-50"
                            disabled={
                                page ===
                                Math.ceil(data?.total_page || 1 / limit)
                            }
                            onClick={() => {
                                setPage((prev) =>
                                    Math.min(
                                        prev + 1,
                                        Math.ceil(data?.total_page || 1 / limit)
                                    )
                                );
                                window.scrollTo({
                                    top: 895,
                                });
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const RatingProgress = ({
    value,
    bintang,
    total,
}: {
    value: number;
    bintang: string;
    total: number;
}) => {
    const percentage = Math.round((value / total) * 100);
    return (
        <div className="flex flex-row items-center gap-1">
            <span className="-mt-1">
                <svg
                    className=" inline-block mr-2 align-middle"
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="var(--YN300, #FFC400)"
                >
                    <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                </svg>
            </span>
            <p className="text-xs  text-gray-500 font-medium">{bintang}</p>
            <Progress value={percentage} className="w-full h-1.5 " />
            <p className="text-xs  text-gray-500 font-medium">({value || 0})</p>
        </div>
    );
};

function Skeleton() {
    return Array.from({ length: 5 }, (_, i) => (
        <div
            key={i}
            className="w-full bg-white border-b rounded-md p-5 flex flex-col gap-2 animate-pulse"
        >
            {/* Skeleton for Rating */}
            <div className="inline-flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-300 rounded-full" />
                ))}
                <div className="w-24 h-4 bg-gray-300 rounded-md" />
            </div>

            {/* Skeleton for User and Comment */}
            <div className="flex flex-row gap-2 items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    <div className="w-24 h-4 bg-gray-300 rounded-md" />
                </div>
            </div>

            {/* Skeleton for Variant and Content */}
            <div className="w-32 h-4 bg-gray-300 rounded-md" />
            <div className="w-full h-6 bg-gray-300 rounded-md mt-2" />
        </div>
    ));
}
