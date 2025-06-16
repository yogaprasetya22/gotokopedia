import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const CheckoutHeader = ({ title }: { title: string }) => (
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
);

export const CheckoutLoading = () => (
    <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
    </div>
);

export const CheckoutError = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
                Gagal memuat data checkout
            </h2>
            <p className="text-gray-500">Silahkan coba lagi nanti</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
                Refresh
            </Button>
        </div>
    </div>
);
