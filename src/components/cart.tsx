"use client";

import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useHandleCart } from "@/hooks/use-handle-cart";
import { CartStore } from "@/type/cart-checkout-type";
import Image from "next/image";

export function CartNavigation() {
    const { carts, isLoading } = useHandleCart();

    return (
        <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger asChild>
                <div className="relative cursor-pointer">
                    <ShoppingCart className="h-5 w-5" />
                    {carts?.total_items ? (
                        <Badge className="absolute -right-3 -top-2 h-5 w-5 rounded-full p-0 bg-red-400 flex items-center justify-center text-xs font-semibold">
                            {carts.total_items}
                        </Badge>
                    ) : null}
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[30rem] p-4 z-[9999] bg-white dark:bg-zinc-950">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-base">
                            Keranjang ({carts?.total_items || 0} barang)
                        </h3>
                        <Link
                            prefetch={true}
                            href="/cart"
                            className="text-sm text-green-500 hover:underline font-semibold"
                        >
                            Lihat Semua
                        </Link>
                    </div>

                    <Separator />

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="h-16 w-16 rounded-md" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="max-h-[400px] overflow-y-auto">
                            {carts?.cart?.stores?.length ? (
                                carts.cart.stores.map((store: CartStore) => (
                                    <div key={store.id} className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            {store.toko.image_profile && (
                                                <Image
                                                    src={
                                                        store.toko.image_profile
                                                    }
                                                    alt={store.toko.name}
                                                    width={24}
                                                    height={24}
                                                    className="h-6 w-6 rounded-full"
                                                />
                                            )}
                                            <p className="text-sm font-medium truncate max-w-[120px]">
                                                {store.toko.name}
                                            </p>
                                        </div>

                                        {store.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-3 mb-3"
                                            >
                                                {item.product.image_urls
                                                    ?.length > 0 && (
                                                    <div className="h-16 w-16 rounded-md border overflow-hidden">
                                                        <Image
                                                            src={
                                                                item.product
                                                                    .image_urls[0]
                                                            }
                                                            alt={
                                                                item.product
                                                                    .name
                                                            }
                                                            width={64}
                                                            height={64}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm line-clamp-2">
                                                        {item.product.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-sm font-medium">
                                                            Rp
                                                            {(
                                                                item.product
                                                                    .discount_price ||
                                                                item.product
                                                                    .price
                                                            ).toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </span>
                                                        {item.product.discount >
                                                            0 && (
                                                            <Badge
                                                                variant="destructive"
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    item.product
                                                                        .discount
                                                                }
                                                                %
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Qty: {item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    Keranjang belanja kosong
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
