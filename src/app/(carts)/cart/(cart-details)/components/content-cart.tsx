import { CartStoreWithItems, SelectedItems } from "../page";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useHandleCart } from "@/hooks/use-handle-cart";
import { Checkbox } from "@/components/ui/checkbox";
import { CartItem } from "@/type/cart-checkout-type";

interface ContentCartProps {
    isAllSelected: boolean;
    toggleSelectAll: () => void;
    toggleStoreSelection: (storeId: string) => void;
    toggleItemSelection: (storeId: string, itemId: string) => void;
    selectedItems: SelectedItems;
}

export default function ContentCart({
    isAllSelected,
    toggleSelectAll,
    toggleStoreSelection,
    toggleItemSelection,
    selectedItems,
}: ContentCartProps) {
    const {
        stores,
        hasNextPage,
        fetchNextPage,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
    } = useHandleCart();
    return (
        <div className="w-full flex flex-col gap-4">
            {stores?.length ? (
                <>
                    <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-4">
                        <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={toggleSelectAll}
                            className="h-5 w-5"
                        />
                        <span className="text-sm font-medium">
                            Pilih Semua (
                            {stores.reduce(
                                (sum: number, store: CartStoreWithItems) =>
                                    sum + store.items.length,
                                0
                            )}{" "}
                            barang)
                        </span>
                    </div>

                    {stores.map((store: CartStoreWithItems) => {
                        const isStoreSelected = store.items.every(
                            (item) => selectedItems[store.id]?.[item.id]
                        );

                        return (
                            <div
                                key={store.id}
                                className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4"
                            >
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={isStoreSelected}
                                        onCheckedChange={() =>
                                            toggleStoreSelection(store.id)
                                        }
                                        className="h-5 w-5"
                                    />
                                    <div className="flex items-center gap-2">
                                        {store.toko.image_profile && (
                                            <Image
                                                src={store.toko.image_profile}
                                                alt={store.toko.name}
                                                width={24}
                                                height={24}
                                                className="rounded-full"
                                            />
                                        )}
                                        <h3 className="font-medium">
                                            {store.toko.name}
                                        </h3>
                                    </div>
                                </div>

                                {store.items.map((item: CartItem) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 border-b pb-4 last:border-0 pl-8"
                                    >
                                        <Checkbox
                                            checked={
                                                selectedItems[store.id]?.[
                                                    item.id
                                                ] || false
                                            }
                                            onCheckedChange={() =>
                                                toggleItemSelection(
                                                    store.id,
                                                    item.id
                                                )
                                            }
                                            className="h-5 w-5 mt-1"
                                        />
                                        {item.product.image_urls?.[0] && (
                                            <div className="relative h-24 w-24 rounded-md overflow-hidden">
                                                <Image
                                                    src={
                                                        item.product
                                                            .image_urls[0]
                                                    }
                                                    alt={item.product.name}
                                                    width={500}
                                                    height={500}
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-medium line-clamp-2">
                                                {item.product.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-medium">
                                                    Rp
                                                    {(
                                                        item.product
                                                            .discount_price ||
                                                        item.product.price
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                                {item.product.discount > 0 && (
                                                    <span className="text-xs text-red-500 line-through">
                                                        Rp
                                                        {item.product.price.toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            decreaseQuantity.mutate(
                                                                item.id
                                                            )
                                                        }
                                                        disabled={
                                                            decreaseQuantity.isPending ||
                                                            item.quantity <= 1
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="text-sm text-gray-500 w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            increaseQuantity.mutate(
                                                                item.id
                                                            )
                                                        }
                                                        disabled={
                                                            increaseQuantity.isPending
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        Rp
                                                        {(
                                                            (item.product
                                                                .discount_price ||
                                                                item.product
                                                                    .price) *
                                                            item.quantity
                                                        ).toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            deleteItem.mutate(
                                                                item.cart_store_id
                                                            )
                                                        }
                                                        disabled={
                                                            deleteItem.isPending
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                    {hasNextPage && (
                        <div className="w-full flex justify-center my-5">
                            <Button
                                variant={"outline"}
                                className=" border-green-400 text-green-400 text-md font-semibold px-20 hover:text-green-500"
                                onClick={() => {
                                    fetchNextPage();
                                }}
                            >
                                Muat Lebih Banyak
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-lg shadow-md p-8">
                    <ShoppingCart className="h-16 w-16 text-gray-400" />
                    <h3 className="text-lg font-semibold">Keranjang kosong</h3>
                    <p className="text-sm text-gray-500">
                        Silahkan tambahkan produk ke keranjang
                    </p>
                    <Button>Belanja Sekarang</Button>
                </div>
            )}
        </div>
    );
}
