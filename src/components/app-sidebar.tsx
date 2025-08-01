"use client";

import * as React from "react";
import {
    AudioWaveform,
    Command,
    Home,
    GalleryVerticalEnd,
    SquareTerminal,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./sidebar/team-switcher";
import { NavMain } from "./sidebar/nav-main";
import { NavDashboard } from "./sidebar/nav-dashboard";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    
    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        teams: [
            {
                name: "Acme Inc",
                logo: GalleryVerticalEnd,
                plan: "Enterprise",
            },
            {
                name: "Acme Corp.",
                logo: AudioWaveform,
                plan: "Startup",
            },
            {
                name: "Evil Corp.",
                logo: Command,
                plan: "Free",
            },
        ],
        navMain: [
            {
                label: "Products",
                title: "Products",
                url: "#",
                icon: SquareTerminal,
                isActive: false,
                items: [
                    {
                        title: "Products",
                        url: "products",
                    },
                    {
                        title: "Products Penjualans",
                        url: "products/penjualan",
                    },
                ],
            },
            // {
            //     label: "Penjualan",
            //     title: "Penjualan",
            //     url: "#",
            //     icon: Home,
            //     isActive: false,
            //     items: [
            //         {
            //             title: "Penjualan",
            //             url: "penjualan",
            //         },
            //         {
            //             title: "Penjualan History",
            //             url: "penjualan/history",
            //         },
            //         {
            //             title: "Penjualan Report",
            //             url: "penjualan/report",
            //         },
            //     ],
            // },
        ],
        items: [
            {
                name: "Home",
                url: "my-store",
                icon: Home,
            },
        ],
    };
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavDashboard items={data.items} />
                <NavMain items={data.navMain} />
            </SidebarContent>
        </Sidebar>
    );
}
