"use client";

import Link from "next/link";
import { UserButton } from "./shared/user-button";
import Image from "next/image";
import { CartNavigation } from "./cart";
import { Button } from "@/components/ui/button"; // atau ganti dengan tombol milikmu

export function HeaderSidebar() {
    return (
        <header className="fixed px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="grid grid-cols-5 items-center h-16 px-6">
                {/* Kiri - Logo */}
                <div className="flex items-center">
                    <Link prefetch={true} href="/" className="flex items-center space-x-2">
                        <Image
                            src="https://images.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="w-[10rem]"
                            priority
                        />
                    </Link>
                </div>

                {/* Tengah (span 3 kolom) - Kategori + Search + Cart */}
                <div className="col-span-3 flex items-center justify-center space-x-4">

                    {/* Search */}
                    <form className="flex-grow">
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </form>

                    {/* Cart */}
                    {/* <CartNavigation /> */}
                </div>

                {/* Kanan - User */}
                <div className="flex justify-end">
                    <UserButton />
                </div>
            </div>
        </header>
    );
}
