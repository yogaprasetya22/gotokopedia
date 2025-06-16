"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useHandleOrder } from "@/hooks/use-handle-order";
import { Skeleton } from "@/components/ui/skeleton";
import { Order, OrderItem } from "@/type/order-payment-type";

export default function OrderList() {
    const { listOrders } = useHandleOrder();
    const { data: orders, isLoading, isError } = listOrders();

    if (isLoading) {
        return (
            <div className="w-full flex flex-col gap-4">
                <Skeleton className="h-8 w-32" />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !orders) {
        return <p>Gagal memuat daftar pesanan.</p>;
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-lg font-extrabold">Order List</h2>
            <div className="w-full flex flex-col gap-4 bg-white rounded-lg shadow-md border">
                {orders &&
                    orders.map((order: Order) => (
                        <div key={order.id} className="p-2">
                            <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>🛍️ Belanja</span>
                                        <span className="text-black">
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString("id-ID")}
                                        </span>
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                                            Selesai
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {order.order_number}
                                    </span>
                                </div>

                                {order.items.map((item: OrderItem) => (
                                    <div key={item.id} className="flex gap-3">
                                        <img
                                            src={item.toko.image_profile}
                                            alt={item.toko.name}
                                            className="h-5 w-5 object-contain"
                                        />
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-semibold">
                                                {item.toko.name}
                                            </p>
                                            <div className="flex gap-3 mt-2">
                                                <img
                                                    src={
                                                        item.product
                                                            .image_urls[0]
                                                    }
                                                    alt={item.product.name}
                                                    className="h-16 w-16 object-cover rounded border"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium line-clamp-1">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {item.quantity} barang x{" "}
                                                        {new Intl.NumberFormat(
                                                            "id-ID",
                                                            {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            }
                                                        ).format(item.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center border-t pt-3">
                                    <div className="text-sm text-muted-foreground">
                                        Total Belanja
                                        <div className="text-base text-black font-semibold">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(order.final_price)}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="link"
                                            className="text-sm font-medium text-green-600 p-0 h-auto"
                                        >
                                            Lihat Detail Transaksi
                                        </Button>
                                        <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
                                            Beli Lagi
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
