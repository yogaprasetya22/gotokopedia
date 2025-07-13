import { api } from "@/lib/api";
import { User } from "@/type/user-auth-type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCurrentUser = () => {
    const {
        isLoading,
        isError,
        data: user,
    } = useQuery<User | null, AxiosError>({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await api.get(`/users/current`);
            return response.data.data;
        },
        retry: (failureCount, error: AxiosError) => {
            if (error?.response?.status === 401) return false;
            return failureCount < 3;
        },
        staleTime: 1000 * 60 * 5,
    });

    return { isLoading, isError, user };
};
