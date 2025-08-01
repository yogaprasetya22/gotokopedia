import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { ShippingAddress } from "@/type/shipping-addres-type";
import { AxiosError } from "axios";

export const useHandleShippingAddresses = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const showErrorToast = (
        title: string,
        error?: AxiosError<{ message?: string }>
    ) => {
        toast({
            variant: "destructive",
            title,
            description: error?.response?.data?.message || "Terjadi kesalahan",
        });
    };

    const useListShippingAddresses = () => {
        const query = useQuery<
            ShippingAddress[] | null,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["shipping-addresses"],
            queryFn: async () => {
                const res = await api.get("shipping-addresses");
                return res.data.data;
            },
            staleTime: 10000,
        });

        useEffect(() => {
            if (query.isError) {
                showErrorToast(
                    "Gagal mengambil daftar alamat pengiriman",
                    query.error
                );
            }
        }, [query.isError, query.error]);

        return query;
    };

    const useDefaultShippingAddresses = () => {
        const query = useQuery<
            ShippingAddress | null,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["default-shipping-address"],
            queryFn: async () => {
                const res = await api.get("shipping-addresses/default");
                return res.data.data;
            },
            staleTime: 10000,
        });

        useEffect(() => {
            if (query.isError) {
                showErrorToast(
                    "Gagal mengambil alamat pengiriman default",
                    query.error
                );
            }
        }, [query.isError, query.error]);

        return query;
    };

    const useShippingAddress = (id: string | number) => {
        const query = useQuery<
            ShippingAddress,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["shipping-address", id],
            queryFn: async () => {
                const res = await api.get(`/shipping-addresses/${id}`);
                return res.data.data;
            },
            enabled: !!id,
            staleTime: 10000,
        });

        useEffect(() => {
            if (query.isError) {
                showErrorToast(
                    "Gagal mengambil alamat pengiriman",
                    query.error
                );
            }
        }, [query.isError, query.error]);

        useEffect(() => {
            if (query.isSuccess && query.data === null) {
                toast({
                    variant: "destructive",
                    title: "Alamat pengiriman tidak ditemukan",
                    description: "Alamat pengiriman yang diminta tidak ada",
                });
            }
        }, [query.isSuccess, query.data]);

        return query;
    };

    const createShippingAddress = useMutation<
        ShippingAddress,
        AxiosError<{ message?: string }>,
        Partial<ShippingAddress>
    >({
        mutationFn: async (data) => {
            const res = await api.post("shipping-addresses", data);
            return res.data.data;
        },
        onSuccess: () => {
            queueMicrotask(() => {
                toast({ title: "Berhasil menambah alamat pengiriman" });
                queryClient.invalidateQueries({
                    queryKey: ["shipping-addresses"],
                });
            });
        },
        onError: (error) => {
            showErrorToast("Gagal menambah alamat pengiriman", error);
        },
    });

    const updateShippingAddress = useMutation<
        ShippingAddress,
        AxiosError<{ message?: string }>,
        { id: string | number; data: Partial<ShippingAddress> }
    >({
        mutationFn: async ({ id, data }) => {
            const res = await api.put(`/shipping-addresses/${id}`, data);
            return res.data.data;
        },
        onSuccess: () => {
            queueMicrotask(() => {
                toast({ title: "Berhasil mengubah alamat pengiriman" });
                queryClient.invalidateQueries({
                    queryKey: ["shipping-addresses"],
                });
            });
        },
        onError: (error) => {
            showErrorToast("Gagal mengubah alamat pengiriman", error);
        },
    });

    const deleteShippingAddress = useMutation<
        void,
        AxiosError<{ message?: string }>,
        string
    >({
        mutationFn: async (id) => {
            await api.delete(`/shipping-addresses/${id}`);
        },
        onSuccess: () => {
            queueMicrotask(() => {
                toast({ title: "Berhasil menghapus alamat pengiriman" });
                queryClient.invalidateQueries({
                    queryKey: ["shipping-addresses"],
                });
            });
        },
        onError: (error) => {
            showErrorToast("Gagal menghapus alamat pengiriman", error);
        },
    });

    return {
        useListShippingAddresses,
        useDefaultShippingAddresses,
        useShippingAddress,
        createShippingAddress,
        updateShippingAddress,
        deleteShippingAddress,
    };
};

export type UseHandleShippingAddressesReturn = ReturnType<
    typeof useHandleShippingAddresses
>;
