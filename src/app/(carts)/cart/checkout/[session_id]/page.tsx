"use client";
import { useHandleCheckout } from "@/hooks/use-handle-checkout";
import { useHandlePaymentMethod } from "@/hooks/use-handle-payment-method";
import { useHandleShippingMethod } from "@/hooks/use-handle-shipping-method";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { use, useState } from "react";
import ModalShippingAddress from "./components/modal-shipping-addresses";
import { useHandleShippingAddresses } from "@/hooks/use-handle-shipping-addresses";
import { PaymentMethod, ShippingMethod } from "@/type/order-payment-type";
import { CartStore, CompleteCheckoutPayload } from "@/type/cart-checkout-type";
import { z } from "zod";
import {
    CheckoutError,
    CheckoutHeader,
    CheckoutLoading,
} from "./components/checkout-handler";
import { ShippingAddressSection } from "./components/shipping-address-section";
import { StoreProductsSection } from "./components/store-product-section";
import { ShippingMethodSection } from "./components/shipping-method-section";
import { DeliveryNoteSection } from "./components/delivery-note-section";
import { PaymentMethodSection } from "./components/payment-method-section";
import { OrderSummarySection } from "./components/order-summart-section";

const checkoutSchema = z.object({
    shipping_method_id: z.number({
        required_error: "Metode pengiriman wajib dipilih",
    }),
    payment_method_id: z.number({
        required_error: "Metode pembayaran wajib dipilih",
    }),
    shipping_address_id: z.string({
        required_error: "Alamat pengiriman wajib dipilih",
    }),
    notes: z.string().max(200).optional(),
});

export default function Checkout({
    params: paramsPromise,
}: {
    params: Promise<{ session_id: string }>;
}) {
    const params = use(paramsPromise);
    const [formErrors, setFormErrors] = useState<{
        shipping_method_id?: string;
        payment_method_id?: string;
        shipping_address_id?: string;
    }>({});

    const { session_id } = params;
    const { getCheckoutSession, completeCheckout } = useHandleCheckout();
    const {
        data: checkoutSession,
        isLoading,
        isError,
    } = getCheckoutSession(session_id);
    const { cart_store } = checkoutSession || {};
    const { defaultShippingAddresses } = useHandleShippingAddresses();
    const defaultShippingAddress = defaultShippingAddresses.data;

    // Shipping methods
    const { listShippingMethods } = useHandleShippingMethod();
    const shippingMethods = listShippingMethods.data || [];

    // Payment methods
    const { listPaymentMethods } = useHandlePaymentMethod();
    const paymentMethods = listPaymentMethods.data || [];

    const [selectedShippingMethod, setSelectedShippingMethod] =
        useState<ShippingMethod | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<PaymentMethod | null>(null);
    const [deliveryNote, setDeliveryNote] = useState("");
    const [useInsurance, setUseInsurance] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    if (
        isLoading ||
        listShippingMethods.isLoading ||
        listPaymentMethods.isLoading
    ) {
        return <CheckoutLoading />;
    }

    if (
        isError ||
        !checkoutSession ||
        listShippingMethods.isError ||
        listPaymentMethods.isError
    ) {
        return <CheckoutError />;
    }

    const shippingCost = selectedShippingMethod?.price || 0;
    const insuranceCost = useInsurance ? 200 : 0;
    const totalPayment =
        shippingCost + insuranceCost + checkoutSession.total_price;

    const handleCreateOrder = () => {
        const validationResult = checkoutSchema.safeParse({
            session_id,
            shipping_method_id: selectedShippingMethod?.id,
            payment_method_id: selectedPaymentMethod?.id,
            shipping_address_id: defaultShippingAddress?.id,
            notes: deliveryNote,
        });

        if (!validationResult.success) {
            const errors = validationResult.error.flatten().fieldErrors;
            setFormErrors({
                shipping_method_id: errors.shipping_method_id?.[0],
                payment_method_id: errors.payment_method_id?.[0],
                shipping_address_id: errors.shipping_address_id?.[0],
            });
            return;
        }

        setFormErrors({}); // bersihkan error jika sukses

        const orderData: CompleteCheckoutPayload = {
            session_id,
            shipping_method_id: selectedShippingMethod!.id,
            payment_method_id: selectedPaymentMethod!.id,
            shipping_address_id: defaultShippingAddress!.id,
            notes: deliveryNote,
        };

        setIsProcessing(true);
        completeCheckout.mutateAsync(orderData).finally(() => {
            setIsProcessing(false);
        });
    };

    return (
        <div className="w-full gap-5 flex flex-col">
            <CheckoutHeader title="Checkout" />
            <div className="flex flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <ShippingAddressSection
                        error={formErrors.shipping_address_id}
                    />
                    {cart_store?.map((store: CartStore) => (
                        <div key={store.id} className="flex flex-col">
                            <StoreProductsSection
                                key={store.id}
                                store={store}
                            />
                            <ShippingMethodSection
                                methods={shippingMethods}
                                selectedMethod={selectedShippingMethod}
                                onSelectMethod={setSelectedShippingMethod}
                                error={formErrors.shipping_method_id}
                                useInsurance={useInsurance}
                                onToggleInsurance={() =>
                                    setUseInsurance(!useInsurance)
                                }
                            />
                        </div>
                    ))}

                    <DeliveryNoteSection
                        note={deliveryNote}
                        onNoteChange={setDeliveryNote}
                    />
                </div>

                <aside className="w-[40%] hidden md:flex flex-col gap-2 sticky top-[70px] h-fit">
                    <PaymentMethodSection
                        methods={paymentMethods}
                        selectedMethod={selectedPaymentMethod}
                        onSelectMethod={setSelectedPaymentMethod}
                        error={formErrors.payment_method_id}
                    />

                    <OrderSummarySection
                        totalPayment={totalPayment}
                        isProcessing={isProcessing}
                        isDisabled={
                            !selectedShippingMethod || !selectedPaymentMethod
                        }
                        onSubmit={handleCreateOrder}
                    />
                </aside>
            </div>
        </div>
    );
}
