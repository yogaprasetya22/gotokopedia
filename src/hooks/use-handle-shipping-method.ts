import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { ShippingMethod } from "@/type/order-payment-type";
import { AxiosError } from "axios";

export const useHandleShippingMethod = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // List all shipping methods
    const useListShippingMethods = () => {
        const queryResult = useQuery<
            ShippingMethod[] | null,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["shipping-methods"],
            queryFn: async () => {
                const res = await api.get("shipping-methods");
                return res.data.data;
            },
            staleTime: 10000,
        });

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil daftar metode pengiriman",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    // Get shipping method by id
    const useShippingMethod = (id: string | number) => {
        const queryResult = useQuery<
            ShippingMethod,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["shipping-method", id],
            queryFn: async () => {
                const response = await api.get(`/shipping-methods/${id}`);
                return response.data.data;
            },
            enabled: !!id,
        });

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil detail metode pengiriman",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    // Create shipping method
    const createShippingMethod = useMutation<
        ShippingMethod,
        AxiosError<{ message?: string }>,
        Partial<ShippingMethod>
    >({
        mutationFn: async (data) => {
            const res = await api.post("shipping-methods", data);
            return res.data.data;
        },
        onSuccess: () => {
            toast({
                title: "Berhasil menambah metode pengiriman",
            });
            queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal menambah metode pengiriman",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    // Update shipping method
    const updateShippingMethod = useMutation<
        ShippingMethod,
        AxiosError<{ message?: string }>,
        { id: string | number; data: Partial<ShippingMethod> }
    >({
        mutationFn: async ({ id, data }) => {
            const res = await api.put(`/shipping-methods/${id}`, data);
            return res.data.data;
        },
        onSuccess: () => {
            toast({
                title: "Berhasil mengubah metode pengiriman",
            });
            queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal mengubah metode pengiriman",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    // Delete shipping method
    const deleteShippingMethod = useMutation<
        void,
        AxiosError<{ message?: string }>,
        string | number
    >({
        mutationFn: async (id) => {
            await api.delete(`/shipping-methods/${id}`);
        },
        onSuccess: () => {
            toast({
                title: "Berhasil menghapus metode pengiriman",
            });
            queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal menghapus metode pengiriman",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    return {
        useListShippingMethods,
        useShippingMethod,
        createShippingMethod,
        updateShippingMethod,
        deleteShippingMethod,
    };
};

export type UseHandleShippingMethodReturn = ReturnType<
    typeof useHandleShippingMethod
>;
