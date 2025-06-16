import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { PaymentMethod } from "@/type/order-payment-type";

export const useHandlePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // List all payment methods
  const listPaymentMethods = useQuery<PaymentMethod[], Error>({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      try {
        const res = await api.get("payment-methods");
        return res.data.data;
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Gagal mengambil data metode pembayaran",
          description: error.response?.data?.message || "Terjadi kesalahan",
        });
        throw error;
      }
    },
  });

  // Get payment method by id
  const getPaymentMethod = (id: string | number) =>
    useQuery<PaymentMethod, Error>({
      queryKey: ["payment-method", id],
      queryFn: async () => {
        try {
          const res = await api.get(`/payment-methods/${id}`);
          return res.data.data;
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Gagal mengambil detail metode pembayaran",
            description: error.response?.data?.message || "Terjadi kesalahan",
          });
          throw error;
        }
      },
      enabled: !!id,
    });

  // Create payment method
  const createPaymentMethod = useMutation({
    mutationFn: async (data: Partial<PaymentMethod>) => {
      const res = await api.post("payment-methods", data);
      return res.data.data;
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambah metode pembayaran",
      });
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Gagal menambah metode pembayaran",
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });

  // Update payment method
  const updatePaymentMethod = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: Partial<PaymentMethod>;
    }) => {
      const res = await api.put(`/payment-methods/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      toast({
        title: "Berhasil mengubah metode pembayaran",
      });
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Gagal mengubah metode pembayaran",
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });

  // Delete payment method
  const deletePaymentMethod = useMutation({
    mutationFn: async (id: string | number) => {
      await api.delete(`/payment-methods/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menghapus metode pembayaran",
      });
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Gagal menghapus metode pembayaran",
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });

  return {
    listPaymentMethods,
    getPaymentMethod,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  };
};

export type UseHandlePaymentMethodReturn = ReturnType<typeof useHandlePaymentMethod>;