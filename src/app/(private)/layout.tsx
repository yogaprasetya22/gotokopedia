"use client";

import DashboardLayout from "@/components/dashboard/sidebar";
import { useCurrentUser } from "@/hooks/user-current-user";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const { user, isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 mr-2 animate-spin" />
                </div>
            </div>
        );
    }

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <DashboardLayout>
            <main className="flex-1 overflow-x-hidden bg-white overflow-y-auto p-6 w-full">
                {children}
            </main>
        </DashboardLayout>
    );
}
