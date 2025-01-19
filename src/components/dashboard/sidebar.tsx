"use client";

import { cn } from "@/lib/utils";
import { Home, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, ReactNode } from "react";
import { Navbar } from "../nav";

// Sidebar item types
interface SidebarItem {
    icon: ElementType;
    label: string;
    href: string;
    target?: string;
}

// Sidebar layout
export const Sidebar = () => (
    <aside className="bg-white text-black border-r border-gray-200 w-[280px] min-h-screen hidden lg:block">
        <SidebarContent />
    </aside>
);

// Sidebar content
const SidebarContent = () => {
    const pathname = "/" + usePathname().split("/")[1];

    const sidebarItems: SidebarItem[] = [
        { icon: Home, label: "Home", href: "/" },
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <div className="bg-white text-black h-full flex flex-col">
            <nav className="flex-grow p-6">
                <ul className="flex flex-col flex-grow pt-5 space-y-4">
                    {sidebarItems.map((item) => (
                        <NavLink key={item.label} path={pathname} link={item} />
                    ))}
                </ul>
            </nav>
        </div>
    );
};

// Navigation Link component
const NavLink = ({ path, link }: { path: string; link: SidebarItem }) => (
    <li>
        <Link
            href={link.href}
            target={link.target}
            className={cn(
                "group flex h-9 items-center gap-x-3 rounded-md px-3 text-sm font-semibold leading-5 text-black",
                path === link.href ? "bg-gray-200" : "hover:bg-gray-200"
            )}
        >
            <link.icon className="size-4 shrink-0" />
            {link.label}
        </Link>
    </li>
);

// Dashboard layout
interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
