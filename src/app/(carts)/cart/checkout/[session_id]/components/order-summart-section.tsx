import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const OrderSummarySection = ({
    totalPayment,
    isProcessing,
    isDisabled,
    onSubmit,
}: {
    totalPayment: number;
    isProcessing: boolean;
    isDisabled: boolean;
    onSubmit: () => void;
}) => (
    <div className="bg-white rounded-lg shadow-md p-4 sticky bottom-0">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-sm">Total Tagihan</p>
                <p className="text-lg font-bold">
                    Rp{totalPayment.toLocaleString("id-ID")}
                </p>
            </div>
            <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={isDisabled || isProcessing}
                onClick={onSubmit}
            >
                {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    "Bayar Sekarang"
                )}
            </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
            Dengan melanjutkan pembayaran, kamu menyetujui S&K Asuransi
            Pengiriman & Proteksi
        </p>
    </div>
);
