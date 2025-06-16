import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Product } from "@/type/utils-type";
import { MapPinCheck, ShoppingCart, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DescriptionProductProps {
    product: Product;
    loadMore: boolean;
    handleLoadMore: () => void;
}

export default function DescriptionProduct({
    product,
    loadMore,
    handleLoadMore,
}: DescriptionProductProps) {
    return (
        <main className="flex flex-col gap-2 w-full px-4 md:px-0">
            {/* title */}
            <h1 className="text-lg font-bold">{product.name}</h1>
            <div className=" inline-flex space-x-2 w-full">
                <p className="text-sm  text-black font-medium">
                    Terjual{" "}
                    <span className="text-gray-600 font-light">
                        {product.sold}+
                    </span>
                </p>
                <span className="font-semibold">.</span>
                <div className="inline-flex ">
                    <span className="-mt-1">
                        <svg
                            className=" inline-block mr-2 align-middle"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="var(--YN300, #FFC400)"
                        >
                            <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                        </svg>
                    </span>
                    <p className="text-sm  text-black font-semibold">
                        {Math.round(product.rating * 10) / 10}
                    </p>
                </div>
            </div>
            <p className="text-3xl text-black font-semibold">
                {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                })}
            </p>
            {product.is_for_sale && (
                <div className="space-x-1 flex items-center">
                    <span className="text-red-500 text-xs font-extrabold bg-red-200 px-[4px] py-[1px]">
                        {product.discount}%
                    </span>
                    <p className="text-gray-400 line-through md:text-md text-sm font-semibold">
                        {product.discount_price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        })}
                    </p>
                </div>
            )}
            <Separator className="my-2" />
            {/* Detail */}
            <div className="flex flex-col">
                <Button
                    variant="ghost"
                    className="w-20 border-b-2 border-green-500 text-green-500 font-semibold rounded-none"
                >
                    Detail
                </Button>
                <Separator />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500 font-medium">
                    Kondisi: <span className="text-black">Baru</span>
                </p>
                <p className="text-sm text-gray-500 font-medium">
                    Min. Pemesanan: <span className="text-black">Baru</span>
                </p>
                <p
                    className={cn(
                        "text-sm text-black transition-all ease-in-out max-w-md break-words text-green-description",
                        loadMore ? "" : "truncate-10-lines "
                    )}
                    dangerouslySetInnerHTML={{
                        __html: product.description || "",
                    }}
                />
            </div>
            <Button
                variant="link"
                className=" text-start text-green-500 font-semibold"
                onClick={handleLoadMore}
            >
                {loadMore ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
            </Button>
            <Separator />
            {/* Profile Toko */}
            <div className="flex flex-row gap-4 w-full justify-between py-2">
                <div className="flex flex-row gap-4">
                    {product?.toko?.image_profile && (
                        <Image
                            src={product.toko.image_profile}
                            alt="store-image"
                            width={100}
                            height={100}
                            className="w-12 h-12 rounded-full"
                        />
                    )}
                    <div className="flex flex-col gap-2 py-2">
                        <Button
                            variant={"link"}
                            className="text-black font-bold"
                        >
                            <Link prefetch={true}
                                href={`${origin}/product/${product?.toko?.slug}`}
                                className="text-sm text-black font-semibold flex items-center gap-2"
                            >
                                <Image
                                    src="https://images.tokopedia.net/img/official_store/badge_os.png"
                                    alt="verified"
                                    width={20}
                                    height={20}
                                    className="w-4 h-4"
                                />
                                {product?.toko?.name}
                            </Link>
                        </Button>
                        <p className="text-sm text-gray-500 font-medium">
                            Online{" "}
                            <span className="text-gray-600">1 jam lalu</span>
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
            <Separator />
            <div className="flex flex-col gap-2 py-2">
                <h1 className="text-lg font-semibold">Pengiriman</h1>
                <p className="text-sm text-black font-medium flex items-center gap-2">
                    <MapPinCheck size={16} /> Dikirim dari{" "}
                    {product.toko?.country.replace(/^Dikirim dari\s+/i, "")}
                </p>
                <p className="text-sm text-black font-medium flex items-center gap-2">
                    <ShoppingCart size={16} /> {product.estimation}
                </p>
            </div>
            <Separator />
        </main>
    );
}
