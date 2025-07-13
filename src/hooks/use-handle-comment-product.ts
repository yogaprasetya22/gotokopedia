import {
    useQuery,
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./use-toast";
import { CommentData, MetaComment } from "@/type/comment-product-type";
import { AxiosError, AxiosResponse } from "axios";

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
        `/comment/${slug_products}?limit=${limit}&offset=${offset}&rating=${rating}&sort=desc`
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

    const useCommentsByProduct = (
        slug_products: string,
        offset: number = 0,
        limit: number = 5,
        rating: number = 0,
        enabled: boolean = true
    ) => {
        return useQuery<MetaComment, AxiosError<{ message?: string }>>({
            queryKey: ["currentComment", slug_products, offset, limit, rating],
            queryFn: async () => {
                return await fetchComments({
                    slug_products,
                    offset,
                    limit,
                    rating,
                });
            },
            staleTime: 5000,
            enabled,
        });
    };

    const useSubmitComment = (
        productId: number,
        slug_products: string
    ): UseMutationResult<
        AxiosResponse,
        AxiosError<{ message?: string }>,
        CommentData
    > => {
        return useMutation({
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
                    description:
                        error.response?.data?.message ||
                        "Failed to submit comment",
                });
            },
        });
    };

    return {
        useCommentsByProduct,
        useSubmitComment,
    };
};

export type UseHandleCommentProductReturn = ReturnType<
    typeof useHandleCommentProduct
>;
