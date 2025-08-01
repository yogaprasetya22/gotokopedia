import { Footer } from "@/components/footer";
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
            <Footer />
        </div>
    );
}
