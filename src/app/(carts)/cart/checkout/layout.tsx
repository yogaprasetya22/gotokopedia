import { Header } from "@/components/header";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="h-full bg-gray-100 w-full ">
            <Header />
            <main className="w-full pt-[4.5rem] flex justify-center">
                <div className="container md:px-5 lg:px-10">{children}</div>
            </main>
            <footer className="text-center text-xs text-gray-500 mt-6 pb-10">
                <p>© 2009 - 2025, PT. Tokopedia. All Rights Reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                    <span>Indonesia</span>
                    <span>English</span>
                </div>
            </footer>
        </div>
    );
}
