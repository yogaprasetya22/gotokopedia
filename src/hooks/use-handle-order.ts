import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import { CreateOrderRequest, Order, PaginatedOrderQuery, UpdateOrderStatusRequest } from "@/type/order-payment-type";

export const useHandleOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Create new order from cart
  const createOrder = useMutation({
    mutationFn: async (data: CreateOrderRequest[]) => {
      const res = await api.post("/order", data);
      return res.data.data;
    },
    onSuccess: () => {
      toast({
        title: "Order created successfully",
        description: "Your order has been placed",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
        console.error("Error creating order:", error);
        console.error("Error response:", error.response);
      toast({
        variant: "destructive",
        title: "Failed to create order",
        description: error.response?.data?.message || "An error occurred",
      });
    },
  });

  // Get single order by ID
  const getOrder = (id: number) =>
    useQuery<Order, Error>({
      queryKey: ["order", id],
      queryFn: async () => {
        const res = await api.get(`/order/${id}`);
        return res.data.data;
      },
      enabled: !!id,
    });

  // List orders with pagination
const listOrders = (query?: PaginatedOrderQuery) =>
  useQuery<Order[], Error>({
    queryKey: ["orders", query],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (query?.limit) params.append("limit", query.limit.toString());
      if (query?.offset) params.append("offset", query.offset.toString());
      if (query?.sort) params.append("sort", query.sort);
      if (query?.search) params.append("search", query.search);

      const res = await api.get(`/order?${params.toString()}`);
      return res.data.data;
    },
  });



  // Update order status
  const updateOrderStatus = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateOrderStatusRequest;
    }) => {
      const res = await api.put(`/order/${id}/status`, data);
      return res.data.data;
    },
    onSuccess: () => {
      toast({
        title: "Order status updated",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to update order status",
        description: error.response?.data?.message || "An error occurred",
      });
    },
  });

  return {
    createOrder,
    getOrder,
    listOrders,
    updateOrderStatus,
  };
};

export type UseHandleOrderReturn = ReturnType<typeof useHandleOrder>;