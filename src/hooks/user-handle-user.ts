import { api } from "@/lib/api";
import { User } from "@/type/user-auth-type";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await api.get(`/users/current`);
        return response.data.data;
      } catch (error: any) {
        // Tangani error token invalid (401 Unauthorized)
        if (error?.response?.status === 401) {
          // Token invalid, anggap user tidak login, return null tanpa error
          return null;
        }
        // Kalau error lain, lempar agar React Query set isError = true
        throw error;
      }
    },
    // Optional: jangan retry request kalau error 401
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    },
    // Optional: cache waktu singkat biar kalau token berubah segera update
    staleTime: 1000 * 60 * 5, // 5 menit
  });

  return { isLoading, isError, user };
};
