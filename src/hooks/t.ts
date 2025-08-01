import { api } from "@/lib/api";
import { useCategoryStore } from "@/store/product-store";
import { MetaComment } from "@/type/comment-product-type";
import { DetailProduct, Product } from "@/type/toko-product-type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


const getProduct = async ({
    pageParam = 0,
    currentCategory,
    LIMIT_PAGE,
}: {
    pageParam: number;
    currentCategory: string;
    LIMIT_PAGE: number;
}) => {
    const response = await api.get(
        `/catalogue?search=&category=${currentCategory}&limit=${LIMIT_PAGE}&offset=${pageParam}&platform=marketplace?is_approved=true`
    );

    return response.data;
};

export const useCurrentCatalogue = () => {
    const LIMIT_PAGE = 12;
    const currentCategory = useCategoryStore((state) => state.currentCategory);

    const {
        isLoading,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["currentCatalogue", currentCategory],
        queryFn: ({ pageParam }) =>
            getProduct({
                pageParam,
                currentCategory: currentCategory?.slug || "",
                LIMIT_PAGE,
            }),
        staleTime: 10000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage?.data?.length < LIMIT_PAGE
                ? null
                : allPages.length + 1;
        },
        initialPageParam: 0,
        select: (data) => ({
            pages: data.pages.flatMap((page) => page.data),
        }),
    });
    return {
        isLoading,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};


export const useCurrentProductByToko = (
    slug_toko: string,
    offset: number = 0,
    limit: number = 5,
    enabled: boolean = true
) => {
    return useQuery<Product[]>({
        queryKey: ["currentProductToko", slug_toko],
        queryFn: async () => {
            try {
                const response = await api.get(
                    `/toko/${slug_toko}?limit=${limit}&offset=${
                        offset - 1
                    }`
                );
                return response.data.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        staleTime: 5000,
        enabled,
    });
};

export const useCurrentProduct = (slug_toko: string, slug_products: string) => {
    const {
        isLoading,
        isError,
        data: product,
    } = useQuery<DetailProduct>({
        queryKey: ["currentProduct", slug_products, slug_toko],
        queryFn: async () => {
            try {
                const response = await api.get(
                    `/catalogue/${slug_toko}/${slug_products}`
                );
                return response.data.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { isLoading, isError, product };
};


const getCommentProduct = async ({
    slug_products,
    offset = 0,
    limit,
    rating = 0,
}: {
    slug_products: string;
    offset: number;
    limit: number;
    rating?: number;
}) => {
    const response = await api.get(
        `/comment/${slug_products}?limit=${limit}&offset=${
            offset - 1
        }&rating=${rating}&sort=desc`
    );
    return response.data.data;
};

// pagination comment
export const useCurrentCommentProduct = (
    slug_products: string,
    offset: number = 0,
    limit: number = 5,
    rating: number = 0,
    enabled: boolean = true
) => {
    return useQuery<MetaComment>({
        queryKey: ["currentComment", slug_products, offset, limit, rating],
        queryFn: () =>
            getCommentProduct({ slug_products, offset, limit, rating }),
        staleTime: 5000,
        enabled, // Hanya jalankan query jika enabled true
    });
};
