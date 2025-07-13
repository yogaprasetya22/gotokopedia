import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "@/lib/api";
import {
    CreateOrderRequest,
    Order,
    PaginatedOrderQuery,
    UpdateOrderStatusRequest,
} from "@/type/order-payment-type";
import { AxiosError } from "axios";

export const useHandleOrder = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Create new order from cart
    const createOrder = useMutation<
        Order[],
        AxiosError<{ message?: string }>,
        CreateOrderRequest[]
    >({
        mutationFn: async (data) => {
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
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Failed to create order",
                description:
                    error.response?.data?.message || "An error occurred",
            });
        },
    });

    // Get single order by ID
    const useOrder = (id: number) => {
        const queryResult = useQuery<Order, AxiosError<{ message?: string }>>({
            queryKey: ["order", id],
            queryFn: async () => {
                const response = await api.get(`/order/${id}`);
                return response.data.data;
            },
            enabled: !!id,
            staleTime: 1000 * 60 * 5, // 5 minutes
        });

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Failed to fetch order",
                description:
                    queryResult.error.response?.data?.message ||
                    "An error occurred",
            });
        }

        if (queryResult.isSuccess && queryResult.data === null) {
            toast({
                variant: "destructive",
                title: "Order not found",
                description: "The requested order does not exist",
            });
        }

        return queryResult;
    };

    // List orders with pagination
    const useListOrders = (query?: PaginatedOrderQuery) => {
        const queryResult = useQuery<
            Order[] | null,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["orders", query],
            queryFn: async () => {
                const params = new URLSearchParams();
                if (query?.limit)
                    params.append("limit", query.limit.toString());
                if (query?.offset)
                    params.append("offset", query.offset.toString());
                if (query?.sort) params.append("sort", query.sort);
                if (query?.search) params.append("search", query.search);

                const res = await api.get(`/order?${params.toString()}`);
                return res.data.data;
            },
            staleTime: 1000 * 60 * 5, // 5 minutes
        });

        if (queryResult.isError) {
            toast({
                variant: "destructive",
                title: "Failed to fetch orders",
                description:
                    queryResult.error.response?.data?.message ||
                    "An error occurred",
            });
        }

        if (queryResult.isSuccess && queryResult.data === null) {
            toast({
                variant: "destructive",
                title: "No orders found",
                description: "You have no orders yet",
            });
        }

        return queryResult;
    };

    // Update order status
    const updateOrderStatus = useMutation<
        Order,
        AxiosError<{ message?: string }>,
        { id: number; data: UpdateOrderStatusRequest }
    >({
        mutationFn: async ({ id, data }) => {
            const res = await api.put(`/order/${id}/status`, data);
            return res.data.data;
        },
        onSuccess: () => {
            toast({
                title: "Order status updated",
            });
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Failed to update order status",
                description:
                    error.response?.data?.message || "An error occurred",
            });
        },
    });

    return {
        createOrder,
        useOrder,
        useListOrders,
        updateOrderStatus,
    };
};

export type UseHandleOrderReturn = ReturnType<typeof useHandleOrder>;
