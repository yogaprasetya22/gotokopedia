"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "./shared/user-button";
import Image from "next/image";
import { Button } from "./ui/button";

const navItems: { name: string; href: string }[] = [
    { name: "Kategori", href: "/" },
];

export function Header() {
    const pathname = usePathname();
    return (
        <header className="fixed px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className=" flex h-16 items-center justify-between px-4">
                <div className="mr-4 hidden md:flex">
                    <Link
                        href={"/"}
                        className="mr-6 flex items-center space-x-2"
                    >
                        <Image
                            src="https://images.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="w-[10rem]"
                            priority
                        />
                    </Link>
                    <nav className="flex items-center space-x-7 text-sm font-medium">
                        <Button variant="outline" className="border-none">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "transition-colors hover:text-foreground/80",
                                        pathname === item.href
                                            ? "text-foreground"
                                            : "text-foreground/60"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </Button>
                    </nav>
                </div>
                <UserButton />
            </div>
        </header>
    );
}
