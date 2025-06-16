import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { ShippingMethod } from "@/type/order-payment-type";

export const useHandleShippingMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // List all shipping methods
  const listShippingMethods = useQuery<ShippingMethod[], Error>({
    queryKey: ["shipping-methods"],
    queryFn: async () => {
      try {
        const res = await api.get("shipping-methods");
        return res.data.data;
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Gagal mengambil data metode pengiriman",
          description: error.response?.data?.message || "Terjadi kesalahan",
        });
        throw error;
      }
    },
  });

  // Get shipping method by id
  const getShippingMethod = (id: string | number) =>
    useQuery<ShippingMethod, Error>({
      queryKey: ["shipping-method", id],
      queryFn: async () => {
        try {
          const res = await api.get(`/shipping-methods/${id}`);
          return res.data.data;
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Gagal mengambil detail metode pengiriman",
            description: error.response?.data?.message || "Terjadi kesalahan",
          });
          throw error;
        }
      },
      enabled: !!id,
    });

  // Create shipping method
  const createShippingMethod = useMutation({
    mutationFn: async (data: Partial<ShippingMethod>) => {
      const res = await api.post("shipping-methods", data);
      return res.data.data;
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambah metode pengiriman",
      });
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Gagal menambah metode pengiriman",
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });

  // Update shipping method
  const updateShippingMethod = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: Partial<ShippingMethod>;
    }) => {
      const res = await api.put(`/shipping-methods/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      toast({
        title: "Berhasil mengubah metode pengiriman",
      });
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Gagal mengubah metode pengiriman",
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });

  // Delete shipping method
  const deleteShippingMethod = useMutation({
    mutationFn: async (id: string | number) => {
      await api.delete(`/shipping-methods/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menghapus metode pengiriman",
      });
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Gagal menghapus metode pengiriman",
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });

  return {
    listShippingMethods,
    getShippingMethod,
    createShippingMethod,
    updateShippingMethod,
    deleteShippingMethod,
  };
};

export type UseHandleShippingMethodReturn = ReturnType<typeof useHandleShippingMethod>;