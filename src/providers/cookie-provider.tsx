"use client";

import { useCurrentCookieStore } from "@/hooks/use-current-cookie";
import { ReactNode, useEffect } from "react";

interface CookieProviderProps {
    defaultOpen: boolean;
    children: ReactNode;
}

export function CookieProvider({ defaultOpen, children }: CookieProviderProps) {
    const setDefaultOpen = useCurrentCookieStore(
        (state) => state.setDefaultOpen
    );

    useEffect(() => {
        // Set initial state dari cookie yang diterima dari server
        setDefaultOpen(defaultOpen);
    }, [defaultOpen, setDefaultOpen]);

    return <>{children}</>;
}
