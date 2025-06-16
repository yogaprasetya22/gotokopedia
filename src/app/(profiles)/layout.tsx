"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // pastikan punya fungsi `cn` (className merge helper)

interface RootLayoutProps {
    children: React.ReactNode;
}

const TAB = [
    {
        label: "Kotak Masuk",
        item_id: "item-1",
        links: [
            { nama_path: "Chat", url: "#" },
            { nama_path: "Diskusi Produk", url: "#" },
        ],
    },
    {
        label: "Pembelian",
        item_id: "item-2",
        links: [
            { nama_path: "Menunggu Pembayaran", url: "/menunggu-pembayaran" },
            { nama_path: "Daftar Transaksi", url: "/order-list" },
        ],
    },
    {
        label: "Profile saya",
        item_id: "item-3",
        links: [{ nama_path: "Profile", url: "/user/settings" }],
    },
];

export default function RootLayout({ children }: RootLayoutProps) {
    const pathname = usePathname();

    // Mapping default accordion open berdasarkan pathname
    const getDefaultAccordionValue = () => {
        if (pathname.startsWith("/order-list")) return "item-2";
        if (pathname.startsWith("/user/settings")) return "item-3";
        return "item-1";
    };
    const defaultAccordionValue = getDefaultAccordionValue();
    const accordionValues = defaultAccordionValue
        ? [defaultAccordionValue]
        : [];

    return (
        <div className="h-full bg-white w-full">
            <Header />
            <main className="w-full pt-[4.5rem] flex justify-center">
                <div className="container md:px-5 lg:px-10">
                    <div className="w-full gap-5 flex flex-col md:flex-row">
                        <div className="w-full md:w-[25%] flex flex-col gap-4 sticky top-[70px] h-fit">
                            <div className="flex flex-col gap-2 bg-white rounded-lg shadow-md p-4 border">
                                <h2 className="text-lg font-bold mb-2">Yoga</h2>
                                <div className="border-t pt-3">
                                    <Accordion
                                        type="multiple"
                                        className="w-full"
                                        defaultValue={accordionValues}
                                    >
                                        {TAB.map((section) => (
                                            <AccordionItem
                                                key={section.item_id}
                                                value={section.item_id}
                                            >
                                                <AccordionTrigger className="py-2 hover:no-underline font-semibold text-sm">
                                                    {section.label}
                                                </AccordionTrigger>
                                                <AccordionContent className="pl-6 py-1 flex flex-col gap-1">
                                                    {section.links.map(
                                                        (link, index) => (
                                                            <Link
                                                                key={index}
                                                                href={link.url}
                                                                className={cn(
                                                                    "py-1 text-xs",
                                                                    pathname ===
                                                                        link.url &&
                                                                        "text-green-400 border-b border-green-400"
                                                                )}
                                                            >
                                                                {link.nama_path}
                                                            </Link>
                                                        )
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
