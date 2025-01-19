import { Button } from "@/components/ui/button";
import { useCurrentCatalogue } from "@/hooks/use-handle-api";
import Image from "next/image";
import Link from "next/link";

export default function CatalogueProduct() {
    const {
        isLoading,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useCurrentCatalogue();

    return (
        <div className="flex flex-1 flex-col">
            <div className="grid md:grid-cols-6 grid-cols-2 gap-2 md:gap-4 content-stretch w-full ">
                {data &&
                    data.pages.map((product, index) => (
                        <Link
                            key={index}
                            href={`/${product.toko.slug}/${product.slug}`}
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
                            <div className="px-2 py-4 space-y-1">
                                <div className="truncate-2-lines text-sm text-gray-700">
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
                                <p className="text-gray-600 md:text-md text-xs ">
                                    {product.toko.country.replace(
                                        /^Dikirim dari\s+/i,
                                        ""
                                    )}
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
                {isFetchingNextPage &&
                    Array.from({ length: 12 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-5 rounded-lg shadow-lg m-1 md:m-2 w-full bg-neutral-100"
                        >
                            <div className="animate-pulse h-[20vh] w-full bg-gray-20k0/80 rounded-t-lg"></div>
                            <div className="flex flex-col p-4 gap-5">
                                <div className="animate-pulse h-3 w-36 bg-green-200 rounded-xl"></div>
                                <div className="animate-pulse h-3 w-24 bg-pink-200 rounded-xl"></div>
                                <div className="animate-pulse h-3 w-24 bg-pink-200 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
            </div>
            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <Button
                        variant={"outline"}
                        className=" border-green-400 text-green-400 text-md font-semibold px-20 hover:text-green-500"
                        onClick={() => fetchNextPage()}
                    >
                        Muat Lebih Banyak
                    </Button>
                </div>
            )}
        </div>
    );
}
