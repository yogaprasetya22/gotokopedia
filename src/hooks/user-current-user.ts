import { api } from "@/lib/api";
import { TypeUser } from "@/type/utils-type";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
    const {
        isLoading,
        isError,
        data: user,
    } = useQuery<TypeUser>({
        queryKey: ["currentUser"],
        queryFn: async () => {
            try {
                const response = await api.get(`/api/v1/users/current`);
                return response.data.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { isLoading, isError, user };
};
