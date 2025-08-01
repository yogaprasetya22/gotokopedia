import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHandleCart } from "@/hooks/use-handle-cart";
import { Product } from "@/type/toko-product-type";
import { useState } from "react";

interface OrderSummaryCartProps {
    product: Product;
}

export default function OrderSummaryCart({ product }: OrderSummaryCartProps) {
    const { createCart } = useHandleCart();
    const [quantity, setQuantity] = useState(1);

    // Fungsi untuk menambah quantity
    const handleIncrement = () => {
        if (quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
    };

    // Fungsi untuk mengurangi quantity
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    // Hitung subtotal berdasarkan quantity
    const subtotal = product.price * quantity;

    return (
        <aside className="w-[30%] hidden md:flex flex-col gap-4 pt-0 pb-2">
            <div className="flex flex-col items-center gap-2 sticky top-[70px] select-none">
                <h1 className="w-full from-green-800/80 to-green-500 px-4 py-2 bg-gradient-to-r rounded-lg text-extrabold text-white text-md">
                    Beli Sekarang
                </h1>
                <div className="flex flex-col gap-4 w-full justify-between py-2 border border-green-600/60 rounded-lg p-4">
                    <h1 className="text-lg font-semibold">
                        Atur jumlah dan catatan
                    </h1>
                    <Separator />
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-row items-center gap-2 border border-green-600/60 rounded-md">
                            <Button
                                variant="ghost"
                                className="border-green-600 text-green-600 font-semibold rounded-lg px-4"
                                onClick={handleDecrement}
                                disabled={quantity <= 1}
                            >
                                -
                            </Button>
                            <p className="text-sm text-black font-semibold">
                                {quantity}
                            </p>
                            <Button
                                variant="ghost"
                                className="border-green-600 text-green-600 font-semibold rounded-lg px-4"
                                onClick={handleIncrement}
                                disabled={quantity >= product.stock}
                            >
                                +
                            </Button>
                        </div>
                        <h1 className="text-sm text-black font-semibold">
                            Stock: {product.stock}
                        </h1>
                    </div>
                    <div className="flex justify-between items-end">
                        <p className="text-sm text-black font-medium">
                            Subtotal
                        </p>
                        <div className="flex flex-col gap-2 items-end">
                            {product.is_for_sale && product.discount_price && (
                                <p className="text-sm text-gray-400 line-through font-semibold">
                                    {(
                                        product.discount_price * quantity
                                    ).toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                    })}
                                </p>
                            )}
                            <p className="text-lg text-black font-semibold">
                                {subtotal.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={() => {
                                createCart.mutate({
                                    product_id: product.id,
                                    quantity: quantity,
                                });
                            }}
                            variant="signUp"
                        >
                            + Keranjang
                        </Button>
                        <Button variant="signIn">Beli Sekarang</Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
