import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { ShippingAddress } from "@/type/shipping-addres-type";

export const useHandleShippingAddresses = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	// Get all shipping addresses
	const listShippingAddresses = useQuery<ShippingAddress[], Error>({
		queryKey: ["shipping-addresses"],
		queryFn: async () => {
			try {
				const res = await api.get("shipping-addresses");
				return res.data.data;
			} catch (error: any) {
				toast({
					variant: "destructive",
					title: "Gagal mengambil data alamat pengiriman (list)",
					description: error.response?.data?.message || "Terjadi kesalahan",
				});
				throw error;
			}
		},
	});

	// default shipping addresses
	const defaultShippingAddresses = useQuery<ShippingAddress | null, Error>({
	queryKey: ["default-shipping-address","shipping-addresses"],
	queryFn: async () => {
		try {
			const res = await api.get("shipping-addresses/default");
			return res.data.data ?? null;
		} catch (error: any) {
			// Cek jika 404
			if (error.response?.status === 404) {
				return null; // data tidak ada bukan berarti error fatal
			}

			// Kalau bukan 404, baru tampilkan error toast
			toast({
				variant: "destructive",
				title: "Gagal mengambil alamat pengiriman default",
				description: error.response?.data?.message || "Terjadi kesalahan",
			});
			throw error; // biar react-query tahu ini error
		}
	},
});



	// Get shipping address by id
	const getShippingAddress = (id: string | number) =>
		useQuery<ShippingAddress, Error>({
			queryKey: ["shipping-address", id],
			queryFn: async () => {
				try {
					const res = await api.get(`/shipping-addresses/${id}`);
					return res.data.data;
				} catch (error: any) {
					toast({
						variant: "destructive",
						title: "Gagal mengambil detail alamat pengiriman",
						description: error.response?.data?.message || "Terjadi kesalahan",
					});
					throw error;
				}
			},
			enabled: !!id,
		});

	// Create shipping address
	const createShippingAddress = useMutation({
		mutationFn: async (data: Partial<ShippingAddress>) => {
			const res = await api.post("shipping-addresses", data);
			return res.data.data;
		},
		onSuccess: () => {
			toast({
				title: "Berhasil menambah alamat pengiriman",
			});
			queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
		},
		onError: (error: any) => {
			toast({
				variant: "destructive",
				title: "Gagal menambah alamat pengiriman",
				description: error.response?.data?.message || "Terjadi kesalahan",
			});
		},
	});

	// Update shipping address
	const updateShippingAddress = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string | number;
			data: Partial<ShippingAddress>;
		}) => {
			const res = await api.put(`/shipping-addresses/${id}`, data);
			return res.data.data;
		},
		onSuccess: () => {
			toast({
				title: "Berhasil mengubah alamat pengiriman",
			});
			queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
		},
		onError: (error: any) => {
			toast({
				variant: "destructive",
				title: "Gagal mengubah alamat pengiriman",
				description: error.response?.data?.message || "Terjadi kesalahan",
			});
		},
	});

	// Delete shipping address
	const deleteShippingAddress = useMutation({
		mutationFn: async (id: string | number) => {
			await api.delete(`/shipping-addresses/${id}`);
		},
		onSuccess: () => {
			toast({
				title: "Berhasil menghapus alamat pengiriman",
			});
			queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
		},
		onError: (error: any) => {
			toast({
				variant: "destructive",
				title: "Gagal menghapus alamat pengiriman",
				description: error.response?.data?.message || "Terjadi kesalahan",
			});
		},
	});

	return {
		listShippingAddresses,
		defaultShippingAddresses,
		getShippingAddress,
		createShippingAddress,
		updateShippingAddress,
		deleteShippingAddress,
	};
};

export type UseHandleShippingAddressesReturn = ReturnType<typeof useHandleShippingAddresses>;