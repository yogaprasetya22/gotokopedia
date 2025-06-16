import { useQuery, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./use-toast";
import { CommentData, MetaComment } from "@/type/comment-product-type";
import { AxiosResponse } from "axios";

const fetchComments = async ({
  slug_products,
  offset = 0,
  limit = 5,
  rating = 0,
}: {
  slug_products: string;
  offset: number;
  limit: number;
  rating?: number;
}) => {
  const response = await api.get(
        `/comment/${slug_products}?limit=${limit}&offset=${
            offset 
        }&rating=${rating}&sort=desc`
    );
    return response.data.data;
};

// Submit komentar baru
const postComment = async ({
  productId,
  data,
}: {
  productId: number;
  data: CommentData;
}): Promise<AxiosResponse> => {
  return await api.post(`/product/${productId}/comment`, {
    content: data.comment,
    rating: data.rating,
  });
};

export const useHandleCommentProduct = () => {
    const queryClient = useQueryClient();
  const { toast } = useToast();

  const getCommentsByProduct = (
    slug_products: string,
    offset: number = 0,
    limit: number = 5,
    rating: number = 0,
    enabled: boolean = true
  ) =>
    useQuery<MetaComment>({
      queryKey: ["currentComment", slug_products, offset, limit, rating],
      queryFn: async () => {
        try {
          return await fetchComments({ slug_products, offset, limit, rating });
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Gagal mengambil komentar produk",
            description:
              error.response?.data?.message || "Terjadi kesalahan saat memuat komentar",
          });
          throw error;
        }
      },
      staleTime: 5000,
      enabled,
    });

 const useSubmitComment = (
  productId: number,
  slug_products: string // <- perlu ini untuk invalidasi query komentar
): UseMutationResult<AxiosResponse, unknown, CommentData> =>
  useMutation({
    mutationFn: (data) => postComment({ productId, data }),
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success",
        description: "Comment has been submitted",
      });

      // Invalidate agar komentar diperbarui
      queryClient.invalidateQueries({
        queryKey: ["currentComment", slug_products],
        exact: false,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit comment",
      });
      console.error(error);
    },
  });

  return {
    getCommentsByProduct,
    useSubmitComment,
  };
};

export type UseHandleCommentProductReturn = ReturnType<typeof useHandleCommentProduct>;
