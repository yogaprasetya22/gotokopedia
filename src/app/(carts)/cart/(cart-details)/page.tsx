"use client";

import { useHandleCart } from "@/hooks/use-handle-cart";
import { useState, useEffect, useRef } from "react";
import SkeletonCart from "./components/skeleton-cart";
import ErrorCart from "./components/error-cart";
import ContentCart from "./components/content-cart";
import OrderSummaryCart from "./components/order-summary-cart";
import { CartItem, CartStore } from "@/type/cart-checkout-type";
import { Product, Toko } from "@/type/toko-product-type";
import EmptyCart from "./components/empty-cart";
import { isEqual } from "lodash";

export interface SelectedItems {
    [storeId: string]: {
        [itemId: string]: boolean;
    };
}

export interface SelectStore {
    storeId: string[];
}

export interface CartStoreWithItems extends CartStore {
    toko: Toko;
    items: (CartItem & {
        product: Product;
    })[];
}

export default function Cart() {
    const { carts, stores, isLoading, isError } = useHandleCart();
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const [selectStore, setSelectStore] = useState<SelectStore>({
        storeId: [],
    });
    const prevStoresRef = useRef(stores);

    // Initialize selectedItems
    useEffect(() => {
        const isSelectedInitialized = Object.keys(selectedItems).length > 0;
        if (!stores || isSelectedInitialized) return;

        // Only initialize if stores have actually changed
        if (!isEqual(prevStoresRef.current, stores)) {
            const initialSelected: SelectedItems = {};
            stores.forEach((store: CartStoreWithItems) => {
                initialSelected[store.id] = {};
                store.items?.forEach((item) => {
                    initialSelected[store.id][item.id] = false;
                });
            });

            setSelectedItems(initialSelected);
            prevStoresRef.current = stores;
        }
    }, [stores, selectedItems]);

    // Update selectStore based on selectedItems
    useEffect(() => {
        const newSelectStore: SelectStore = { storeId: [] };
        Object.keys(selectedItems).forEach((storeId) => {
            const storeItems = selectedItems[storeId];
            const allSelected = Object.values(storeItems).every(Boolean);
            if (allSelected && Object.keys(storeItems).length > 0) {
                newSelectStore.storeId.push(storeId);
            }
        });
        setSelectStore(newSelectStore);
    }, [selectedItems]);

    // Check if all items in all stores are selected
    const isAllSelected =
        stores?.length &&
        stores.every((store: CartStoreWithItems) =>
            store.items?.every((item) => selectedItems[store.id]?.[item.id])
        );

    const toggleSelectAll = () => {
        const newSelectAll = !isAllSelected;
        const updatedSelected: SelectedItems = {};

        stores?.forEach((store: CartStoreWithItems) => {
            updatedSelected[store.id] = {};
            store.items?.forEach((item) => {
                updatedSelected[store.id][item.id] = newSelectAll;
            });
        });

        setSelectedItems(updatedSelected);
    };

    const toggleItemSelection = (storeId: string, itemId: string) => {
        setSelectedItems((prev) => ({
            ...prev,
            [storeId]: {
                ...prev[storeId],
                [itemId]: !prev[storeId]?.[itemId],
            },
        }));
    };

    const toggleStoreSelection = (storeId: string) => {
        const store = stores?.find((s) => s.id === storeId);
        if (!store) return;

        const allSelected = store.items?.every(
            (item: CartItem) => selectedItems[storeId]?.[item.id]
        );

        setSelectedItems((prev) => ({
            ...prev,
            [storeId]: Object.fromEntries(
                store.items?.map((item: CartItem) => [item.id, !allSelected]) ??
                    []
            ),
        }));
    };

    const { totalSelectedItems, totalSelectedPrice } = Array.isArray(stores)
        ? stores.reduce(
              (acc, store) => {
                  store.items?.forEach((item: CartItem) => {
                      if (selectedItems[store.id]?.[item.id]) {
                          acc.totalSelectedItems += item.quantity;
                          acc.totalSelectedPrice +=
                              (item.product.discount_price ||
                                  item.product.price) * item.quantity;
                      }
                  });
                  return acc;
              },
              { totalSelectedItems: 0, totalSelectedPrice: 0 }
          )
        : { totalSelectedItems: 0, totalSelectedPrice: 0 };

    if (isLoading) return <SkeletonCart />;
    if (isError) return <ErrorCart />;
    if (!stores || stores.length === 0) return <EmptyCart />;

    return (
        <div className="w-full gap-5 flex flex-col">
            <h2 className="text-2xl font-extrabold">
                Keranjang ({carts?.total_items || 0} barang)
            </h2>
            <div className="flex flex-row gap-4 w-full">
                <ContentCart
                    selectedItems={selectedItems}
                    toggleSelectAll={toggleSelectAll}
                    toggleStoreSelection={toggleStoreSelection}
                    toggleItemSelection={toggleItemSelection}
                    isAllSelected={!!isAllSelected}
                />
                <OrderSummaryCart
                    selectStore={selectStore}
                    totalSelectedPrice={totalSelectedPrice}
                    totalSelectedItems={totalSelectedItems}
                />
            </div>
        </div>
    );
}
