import { CartItem, CartStore } from "@/type/cart-checkout-type";
import Image from "next/image";

export const StoreProductsSection = ({ store }: { store: CartStore }) => (
    <div key={store.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center mb-3">
            {store.toko.image_profile && (
                <Image
                    src={store.toko.image_profile}
                    alt={store.toko.name}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                />
            )}
            <h3 className="font-medium">{store.toko.name}</h3>
        </div>
        {store.items.map((item: CartItem) => (
            <ProductItem key={item.id} item={item} />
        ))}
    </div>
);

const ProductItem = ({ item }: { item: CartItem }) => (
    <div className="flex border-b py-3 last:border-0">
        {item.product.image_urls?.[0] && (
            <div className="relative h-16 w-16 rounded-md overflow-hidden mr-3">
                <Image
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>
        )}
        <div className="flex-1">
            <h4 className="font-medium">{item.product.name}</h4>
            <div className="flex justify-between mt-1">
                <span className="font-medium">
                    {item.quantity} x Rp
                    {item.product.discount_price?.toLocaleString("id-ID") ||
                        item.product.price.toLocaleString("id-ID")}
                </span>
                <span className="font-medium">
                    Rp
                    {(
                        item.quantity *
                        (item.product.discount_price || item.product.price)
                    ).toLocaleString("id-ID")}
                </span>
            </div>
        </div>
    </div>
);
