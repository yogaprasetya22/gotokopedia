import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { PaymentMethod } from "@/type/order-payment-type";
import { AxiosError } from "axios";

export const useHandlePaymentMethod = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // List all payment methods
    const useListPaymentMethods = () => {
        const queryResult = useQuery<
            PaymentMethod[] | null,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["payment-methods"],
            queryFn: async () => {
                const res = await api.get("payment-methods");
                return res.data.data;
            },
            staleTime: 10000,
        });

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil daftar metode pembayaran",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    // Get payment method by id
    const usePaymentMethod = (id: string | number) => {
        const queryResult = useQuery<
            PaymentMethod,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["payment-method", id],
            queryFn: async () => {
                const response = await api.get(`/payment-methods/${id}`);
                return response.data.data;
            },
            enabled: !!id,
        });

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil detail metode pembayaran",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    // Create payment method
    const createPaymentMethod = useMutation<
        PaymentMethod,
        AxiosError<{ message?: string }>,
        Partial<PaymentMethod>
    >({
        mutationFn: async (data) => {
            const res = await api.post("payment-methods", data);
            return res.data.data;
        },
        onSuccess: () => {
            toast({
                title: "Berhasil menambah metode pembayaran",
            });
            queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal menambah metode pembayaran",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    // Update payment method
    const updatePaymentMethod = useMutation<
        PaymentMethod,
        AxiosError<{ message?: string }>,
        { id: string | number; data: Partial<PaymentMethod> }
    >({
        mutationFn: async ({ id, data }) => {
            const res = await api.put(`/payment-methods/${id}`, data);
            return res.data.data;
        },
        onSuccess: () => {
            toast({
                title: "Berhasil mengubah metode pembayaran",
            });
            queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal mengubah metode pembayaran",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    // Delete payment method
    const deletePaymentMethod = useMutation<
        void,
        AxiosError<{ message?: string }>,
        string | number
    >({
        mutationFn: async (id) => {
            await api.delete(`/payment-methods/${id}`);
        },
        onSuccess: () => {
            toast({
                title: "Berhasil menghapus metode pembayaran",
            });
            queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal menghapus metode pembayaran",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    return {
        useListPaymentMethods,
        usePaymentMethod,
        createPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
    };
};

export type UseHandlePaymentMethodReturn = ReturnType<
    typeof useHandlePaymentMethod
>;
