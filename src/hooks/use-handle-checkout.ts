import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { CheckoutSession, CompleteCheckoutPayload, StartCheckoutPayload } from "@/type/cart-checkout-type";

export const useHandleCheckout = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Start checkout session
    const startCheckout = useMutation<
        CheckoutSession,
        Error,
        StartCheckoutPayload
    >({
        mutationFn: async (payload) => {
            const response = await api.post("checkout/start", payload);
            return response.data.data;
        },
        onSuccess: (data) => {
            toast({
                title: "Checkout session started",
                description: "Please complete your checkout",
            });
            window.location.href = `/cart/checkout/${data.session_id}`;
        },
        onError: (error: any) => {
            console.log("Error starting checkout:", error);
            if(error?.response?.status == 400) {
            toast({
                variant: "warning",
                title: "Gage checkout",
                description:
                    "Karena pada product tersebut stock sudah habis, checkout tidak dapat dilanjutkan",
            });
            }
        },
    });

    // Get checkout session details
// Get checkout session details
const getCheckoutSession = (sessionId: string) => {
    const queryResult = useQuery({
        queryKey: ["checkoutSession", sessionId],
        queryFn: async () => {
            const response = await api.get(`/checkout/${sessionId}`);
            return response.data.data;
        },
        enabled: !!sessionId,
        staleTime: 1000 * 60 * 5
    });

    // Handle case where data is null
    if (queryResult.data === null && queryResult.isSuccess) {
        toast({
            variant: "destructive",
            title: "Invalid checkout session",
            description: "Checkout session not found",
        });
        window.location.href = "/cart";
    }

    // Handle error
    if (queryResult.error) {
        if ((queryResult.error as any).response?.status === 404) {
            window.location.href = "/cart";
        }
    }

    return queryResult;
};


    // Complete checkout
    const completeCheckout = useMutation<
        void,
        Error,
        CompleteCheckoutPayload
    >({
        mutationFn: async (payload) => {
            await api.post("checkout/complete", payload);
        },
        onSuccess: () => {
            toast({
                title: "Order placed successfully",
                description: "Your order has been placed successfully",
            });
            queryClient.invalidateQueries({ queryKey: ["infiniteCart"] });
            window.location.href = "/order-list";
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: "Failed to complete checkout",
                description:
                    error.response?.data?.message || "Failed to complete checkout",
            });
        },
    });

    return {
        startCheckout,
        getCheckoutSession,
        completeCheckout,
    };
};

export type UseHandleCheckoutReturn = ReturnType<typeof useHandleCheckout>;