"use client";

import { UserButton } from "./shared/user-button";

export function Navbar() {
    return (
        <header className="sticky px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center">
                <UserButton />
            </div>
        </header>
    );
}
