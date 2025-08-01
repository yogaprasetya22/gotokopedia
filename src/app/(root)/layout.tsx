import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {

    return (
        <div className="h-full bg-gray-100 w-full ">
            <Header />
            <main className="w-full pt-[4.5rem] bg-white">{children}</main>
            <Footer />
        </div>
    );
}
