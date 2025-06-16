"use client";
import React, { useState, useEffect, use } from "react";
import Ulasan from "../components/ulasan";
import OrderSummaryCart from "../components/order-summary-cart";
import DescriptionProduct from "../components/description-product";
import ImageProduct from "../components/image-product";
import ProductByToko from "../components/product-by-toko";
import { Separator } from "@/components/ui/separator";
import { DetailProduct } from "@/type/toko-product-type";
import { useHandleCatalogue } from "@/hooks/use-handle-product";

export default function Product({
    params: paramsPromise,
}: {
    params: Promise<{ slug: string; toko_slug: string }>;
}) {
    const params = use(paramsPromise); // ⬅️ Unwrap promise
    const { getProductDetail } = useHandleCatalogue();
    const { isLoading, data: product } = getProductDetail(
        params.toko_slug,
        params.slug
    );
    return (
        <div className="w-full flex flex-col">
            <div className="w-full bg-white flex justify-center">
                {isLoading ? (
                    <div className="w-full gap-10 flex md:flex-row flex-col ">
                        <div className="w-full flex flex-col gap-10">
                            <div className="w-full max-w-[80rem] gap-10 flex md:flex-row flex-col ">
                                {/* image-product */}
                                <aside className="w-full md:max-w-[40%]">
                                    <div className="flex flex-col items-center gap-2 sticky top-[70px] select-none">
                                        {/* Skeleton untuk gambar utama */}
                                        <div className="w-full h-[350px] bg-gray-300 rounded-md animate-pulse"></div>
                                        {/* Skeleton untuk carousel gambar */}
                                        <div className="mx-4 md:mx-0 w-full flex gap-2 overflow-x-auto">
                                            {[...Array(4)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="w-[80px] h-[80px] bg-gray-300 rounded-md animate-pulse"
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </aside>

                                {/* descriptian-product */}
                                <main className="flex flex-col gap-2 w-full px-4 md:px-0">
                                    {/* title */}
                                    <div className="w- h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                    <div className="inline-flex space-x-2 w-full">
                                        <div className="w-20 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                        <span className="font-semibold">.</span>
                                        <div className="inline-flex items-center">
                                            <span className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></span>
                                            <div className="w-10 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="w-1/3 h-10 bg-gray-300 rounded-md animate-pulse"></div>
                                    <div className="space-x-1 flex items-center">
                                        <span className="w-8 h-5 bg-red-300 rounded-md animate-pulse"></span>
                                        <div className="w-20 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="my-2 h-1 bg-gray-200 animate-pulse"></div>
                                    {/* Detail */}
                                    <div className="flex flex-col">
                                        <div className="w-20 h-6 bg-green-300 rounded-md animate-pulse"></div>
                                        <div className="h-1 bg-gray-200 animate-pulse"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                        <div className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                        <div className="w-full h-20 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="w-1/4 h-4 bg-green-300 rounded-md animate-pulse"></div>
                                    <div className="h-1 bg-gray-200 animate-pulse"></div>
                                    {/* Profile Toko */}
                                    <div className="flex flex-row gap-4 w-full justify-between py-2">
                                        <div className="flex flex-row gap-4">
                                            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                                            <div className="flex flex-col gap-2 py-2">
                                                <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                                <div className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                                <div className="w-1/4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="w-24 h-8 bg-green-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="h-1 bg-gray-200 animate-pulse"></div>
                                    <div className="flex flex-col gap-2 py-2">
                                        <div className="w-1/3 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                        <div className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="h-1 bg-gray-200 animate-pulse"></div>
                                </main>
                            </div>

                            {/* ulasan */}
                        </div>
                        {/* OrderSummaryCart */}
                        <aside className="w-[30%] hidden md:flex flex-col gap-4 pt-0 pb-2">
                            <div className="flex flex-col items-center gap-2 sticky top-[70px] select-none">
                                {/* Skeleton untuk judul */}
                                <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>

                                {/* Skeleton untuk container isi */}
                                <div className="flex flex-col gap-4 w-full py-2 border border-gray-300 rounded-lg p-4 animate-pulse">
                                    {/* Skeleton untuk header */}
                                    <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
                                    <div className="h-[1px] bg-gray-300 w-full"></div>

                                    {/* Skeleton untuk jumlah dan catatan */}
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
                                            <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
                                            <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
                                        </div>
                                        <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                                    </div>

                                    {/* Skeleton untuk subtotal */}
                                    <div className="flex justify-between items-end">
                                        <div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
                                        <div className="flex flex-col gap-2 items-end">
                                            <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
                                            <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                                        </div>
                                    </div>

                                    {/* Skeleton untuk tombol */}
                                    <div className="flex flex-col gap-2">
                                        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
                                        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    product && <CatalogueDetail product={product} />
                )}
            </div>
        </div>
    );
}

const CatalogueDetail = ({ product }: { product: DetailProduct }) => {
    const [mainImage, setMainImage] = useState<string | undefined>(
        product.image_urls[0]
    );
    const [loadMore, setLoadMore] = useState<boolean>(false);

    useEffect(() => {
        if (product && product.image_urls.length > 0) {
            setMainImage(product.image_urls[0]);
        }
    }, [product]);

    const handleImageClick = (src: string) => {
        setMainImage(src);
    };

    const handleLoadMore = () => {
        if (loadMore) {
            window.scrollTo({ top: 0 });
        }

        setLoadMore(!loadMore);
    };

    return (
        //: Pemisahh Lainya di toko ini
        <div className="w-full gap-5 flex flex-col ">
            {/*//: Pemisah OrderSummaryCart  */}
            <div className="w-full gap-10 flex md:flex-row flex-col ">
                {/*//: Pemisah Ulasan Komentar */}
                <div className="flex flex-col gap-10">
                    <div className="w-full max-w-[80rem] gap-10 flex md:flex-row flex-col ">
                        {/* image-product */}
                        <ImageProduct
                            product={product}
                            mainImage={mainImage}
                            handleImageClick={handleImageClick}
                        />
                        {/* descriptian-product */}
                        <DescriptionProduct
                            product={product}
                            loadMore={loadMore}
                            handleLoadMore={handleLoadMore}
                        />
                    </div>
                    {/* ulasan */}
                    <Ulasan product={product} />
                </div>
                {/* OrderSummaryCart */}
                <OrderSummaryCart product={product} />
            </div>
            <Separator />
            <ProductByToko />
        </div>
    );
};
