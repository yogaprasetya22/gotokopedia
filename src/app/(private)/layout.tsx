"use client";

import { SidebarProvider,  } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/user-handle-user";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderSidebar } from "@/components/header-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 mr-2 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <HeaderSidebar />
            <AppSidebar className="pt-[4.5rem]" />
            <main className="w-full h-full pt-[4.5rem]">{children}</main>
        </SidebarProvider>
    );
}
