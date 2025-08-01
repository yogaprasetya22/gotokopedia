import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import {
    CheckoutSession,
    CompleteCheckoutPayload,
    StartCheckoutPayload,
} from "@/type/cart-checkout-type";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useHandleCheckout = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Start checkout session
    const startCheckout = useMutation<
        CheckoutSession,
        AxiosError<{ message?: string }>,
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
        onError: (error) => {
            if (error.response?.status === 400) {
                toast({
                    variant: "warning",
                    title: "Gagal checkout", // Fixed typo from "Gage" to "Gagal"
                    description:
                        "Karena pada product tersebut stock sudah habis, checkout tidak dapat dilanjutkan",
                });
            }
        },
    });

    // Get checkout session details
    const useCheckoutSession = (sessionId: string) => {
        const queryResult = useQuery<CheckoutSession | null, AxiosError>({
            queryKey: ["checkoutSession", sessionId],
            queryFn: async () => {
                const response = await api.get(`/checkout/${sessionId}`);
                return response.data.data;
            },
            enabled: !!sessionId,
            staleTime: 1000 * 60 * 5,
        });

        // Handle error side effects
        useEffect(() => {
            if (
                queryResult.error &&
                queryResult.error.response?.status === 404
            ) {
                toast({
                    variant: "destructive",
                    title: "Invalid checkout session",
                    description: "Checkout session not found",
                });
                window.location.href = "/cart";
            }
        }, [queryResult.error, toast]);

        // Handle null data side effects
        useEffect(() => {
            if (queryResult.isSuccess && queryResult.data === null) {
                toast({
                    variant: "destructive",
                    title: "Invalid checkout session",
                    description: "Checkout session not found",
                });
                window.location.href = "/cart";
            }
        }, [queryResult.isSuccess, queryResult.data, toast]);

        return queryResult;
    };

    // Complete checkout
    const completeCheckout = useMutation<
        void,
        AxiosError<{ message?: string }>,
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
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Failed to complete checkout",
                description:
                    error.response?.data?.message ||
                    "Failed to complete checkout",
            });
        },
    });

    const useUnpaidCheckout = () => {
        const queryResult = useQuery<
            CheckoutSession[] | null,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["unpaid-checkout"],
            queryFn: async () => {
                const response = await api.get("/checkout/unpaid");
                return response.data.data;
            },
            staleTime: 1000 * 60 * 3,
        });

        useEffect(() => {
            if (queryResult.isError) {
                toast({
                    variant: "destructive",
                    title: "Failed to load unpaid checkouts",
                    description:
                        queryResult.error.response?.data?.message ||
                        "Unknown error occurred",
                });
            }
        }, [queryResult.isError, queryResult.error]);

        useEffect(() => {
            if (queryResult.isSuccess && queryResult.data == null) {
                toast({
                    title: "No unpaid checkouts",
                    description: "You have no unpaid checkout sessions",
                });
            }
        }, [queryResult.isSuccess, queryResult.data, toast]);

        return queryResult;
    };

    return {
        startCheckout,
        useCheckoutSession, // Renamed to follow hook conventions
        completeCheckout,
        useUnpaidCheckout,
    };
};

export type UseHandleCheckoutReturn = ReturnType<typeof useHandleCheckout>;
