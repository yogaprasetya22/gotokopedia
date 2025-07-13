import { useCurrentUser } from "@/hooks/use-handle-user";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { Icons } from "./icons";
import { logout } from "@/lib/api";
import Image from "next/image";

export const UserButton = () => {
    const { isLoading, user } = useCurrentUser();

    const handleLogout = async () => {
        await logout();
        window.location.reload();
        setInterval(() => {
            window.location.href = "/";
        }, 1500);
    };

    return (
        <div className="flex items-center justify-between space-x-2 md:justify-end">
            {isLoading && (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            )}
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 rounded-full">
                            <Avatar className="size-8">
                                <Image
                                    src={user.picture || "/google.png"}
                                    alt="Picture"
                                    width={32}
                                    height={32}
                                    className=" aspect-square h-full w-full rounded-full"
                                />
                                <AvatarFallback className="bg-green-600 text-white">
                                    {user?.username?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuItem className="flex flex-col items-start gap-1 bg-background/95">
                            <div className="text-xs font-medium">
                                {user?.username}
                            </div>
                            <div className="text-xs text-muted-foreground truncate max-w-48">
                                {user?.email}
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem asChild className="py-2">
                            <Link prefetch={true} href={"/dashboard"}>
                                <Icons.dashboard className="w-4 h-4 mr-2" />
                                <span>Dashboard</span>
                            </Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem asChild className="py-2">
                            <Link prefetch={true} href={"/user/settings"}>
                                <Icons.setting className="w-4 h-4 mr-2" />
                                <span>Setting</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <Icons.logout className="w-4 h-4 mr-2" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                !isLoading && (
                    <>
                        <Link prefetch={true} href={"/sign-in"}>
                            <Button variant={"signIn"}>Masuk</Button>
                        </Link>
                        <Link prefetch={true} href={"/sign-up"}>
                            <Button variant={"signUp"}>Daftar</Button>
                        </Link>
                    </>
                )
            )}
        </div>
    );
};
