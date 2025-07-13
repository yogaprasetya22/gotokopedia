import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { ShippingAddress } from "@/type/shipping-addres-type";
import { AxiosError } from "axios";

export const useHandleShippingAddresses = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Get all shipping addresses
    const useListShippingAddresses = () => {
        const queryResult = useQuery<
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

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil daftar alamat pengiriman",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    // default shipping addresses
    const useDefaultShippingAddresses = () => {
        const queryResult = useQuery<
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

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil alamat pengiriman default",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    // Get shipping address by id
    const useShippingAddress = (id: string | number) => {
        const queryResult = useQuery<
            ShippingAddress,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["shipping-address", id],
            queryFn: async () => {
                const response = await api.get(`/shipping-addresses/${id}`);
                return response.data.data;
            },
            enabled: !!id,
            staleTime: 10000,
        });

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil alamat pengiriman",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }
        if (queryResult.isSuccess && queryResult.data === null) {
            toast({
                variant: "destructive",
                title: "Alamat pengiriman tidak ditemukan",
                description: "Alamat pengiriman yang diminta tidak ada",
            });
        }
        return queryResult;
    };

    // Create shipping address
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
            toast({
                title: "Berhasil menambah alamat pengiriman",
            });
            queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal menambah alamat pengiriman",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    // Update shipping address
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
            toast({
                title: "Berhasil mengubah alamat pengiriman",
            });
            queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal mengubah alamat pengiriman",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
        },
    });

    // Delete shipping address
    const deleteShippingAddress = useMutation<
        void,
        AxiosError<{ message?: string }>,
        string
    >({
        mutationFn: async (id) => {
            await api.delete(`/shipping-addresses/${id}`);
        },
        onSuccess: () => {
            toast({
                title: "Berhasil menghapus alamat pengiriman",
            });
            queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Gagal menghapus alamat pengiriman",
                description:
                    error.response?.data?.message || "Terjadi kesalahan",
            });
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
