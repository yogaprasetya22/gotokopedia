"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useHandleCheckout } from "@/hooks/use-handle-checkout";
import Link from "next/link";

import { useEffect, useState } from "react";

type RelativeTimeProps = {
    timestamp: string | Date;
    intervalMs?: number;
};

function getCountdown(from: Date, to: Date): string {
    const seconds = Math.floor((from.getTime() - to.getTime()) / 1000);
    if (seconds <= 0) return "Waktu habis";

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function RelativeTime({
    timestamp,
    intervalMs = 1000,
}: RelativeTimeProps) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    const time =
        typeof timestamp === "string" ? new Date(timestamp) : timestamp;

    return (
        <span className="text-black font-mono">
            {getCountdown(time, now)}
        </span>
    );
}

export default function CheckoutInProgressPage() {
    const { data, isLoading, isError } =
        useHandleCheckout().useUnpaidCheckout();

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

    if (!data) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                    <span className="text-3xl text-gray-400">!</span>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Belum ada checkout yang belum dibayar.
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
                    <span className="text-3xl text-red-500">!</span>
                </div>
                <p className="text-center text-sm text-red-500">
                    Terjadi kesalahan saat memuat checkout belum dibayar.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-lg font-extrabold">Checkout Belum Dibayar</h2>
            <div className="w-full flex flex-col gap-4 bg-white rounded-lg shadow-md border">
                {data.map((session) => (
                    <div key={session.session_id} className="p-2">
                        <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="animate-spin inline-block mr-1">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="#facc15"
                                                strokeWidth="2"
                                                opacity="0.3"
                                            />
                                            <path
                                                d="M12 6v6l4 2"
                                                stroke="#facc15"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span>Menunggu Pembayaran</span>
                                    <span className="text-black">
                                        <RelativeTime
                                            timestamp={session.expires_at}
                                        />
                                    </span>
                                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                                        Belum Dibayar
                                    </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    Session ID: {session.session_id.slice(0, 8)}
                                    ...
                                </span>
                            </div>

                            {session.cart_store.map((store) => (
                                <div key={store.id} className="flex gap-3 mt-4">
                                    <Image
                                        src={
                                            store.toko.image_profile ||
                                            "/default-profile.png"
                                        }
                                        alt={store.toko.name}
                                        width={20}
                                        height={20}
                                        className="h-5 w-5 object-contain"
                                    />
                                    <div className="flex-1 flex flex-col">
                                        <p className="text-sm font-semibold">
                                            {store.toko.name}
                                        </p>
                                        {store.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-3 mt-2"
                                            >
                                                <Image
                                                    src={
                                                        item.product
                                                            .image_urls[0]
                                                    }
                                                    alt={item.product.name}
                                                    width={64}
                                                    height={64}
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
                                                        ).format(
                                                            item.product.price
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
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
                                        }).format(session.total_price)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        className="text-sm font-medium text-green-600 p-0 h-auto"
                                        href={`/cart/checkout/${session.session_id}`}
                                    >
                                        Lanjutkan Pembayaran
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
