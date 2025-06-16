import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHandleCart } from "@/hooks/use-handle-cart";
import React from "react";
import { SelectStore } from "../page";
import { useHandleCheckout } from "@/hooks/use-handle-checkout";

export default function OrderSummaryCart({
    selectStore,
    totalSelectedPrice,
    totalSelectedItems,
}: {
    selectStore: SelectStore;
    totalSelectedPrice: number;
    totalSelectedItems: number;
}) {
    const { stores } = useHandleCart();
    const { startCheckout } = useHandleCheckout();
    return (
        <>
            {stores?.length ? (
                <aside className="w-[40%] hidden md:flex flex-col gap-4 sticky top-[70px] h-fit">
                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-semibold">Ringkasan Belanja</h3>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                            <span>Total Tagihan</span>
                            <span className="text-lg">
                                Rp
                                {totalSelectedPrice.toLocaleString("id-ID")}
                            </span>
                        </div>
                        <Button
                            onClick={() => {
                                startCheckout.mutate({
                                    cart_store_id: selectStore.storeId,
                                });
                            }}
                            className="w-full mt-4"
                            disabled={totalSelectedItems === 0}
                        >
                            Beli ({totalSelectedItems})
                        </Button>
                    </div>
                </aside>
            ) : null}
        </>
    );
}
