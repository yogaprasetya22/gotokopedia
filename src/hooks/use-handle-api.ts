import { api } from "@/lib/api";
import { Category, Toko } from "@/type/toko-product-type";
import { useQuery } from "@tanstack/react-query";

export const useCurrentCategory = () => {
    const {
        isLoading,
        isError,
        data: categories,
    } = useQuery<Category[]>({
        queryKey: ["currentCategory"],
        queryFn: async () => {
            try {
                const response = await api.get("category");
                return response.data.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { isLoading, isError, categories };
};


export const useCurrentToko = (slug_toko: string) => {
    const {
        isLoading,
        isError,
        data: toko,
    } = useQuery<Toko>({
        queryKey: ["currentToko", slug_toko],
        queryFn: async () => {
            try {
                const response = await api.get(
                    `/catalogue/${slug_toko}`
                );
                return response.data.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        staleTime: 5000,
    });

    return { isLoading, isError, toko };
};


export const useCurrentUserToko = (id: string) => {
    const {
        isLoading,
        isError,
        data: toko,
    } = useQuery<Toko[]>({
        queryKey: ["currentUserToko", id],
        queryFn: async () => {
            try {
                const response = await api.get(`/api/users/current/${id}`);
                return response.data.user;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { isLoading, isError, toko };
};

