import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./use-toast";
import { useCategoryStore } from "@/store/product-store";
import { DetailProduct, Product } from "@/type/toko-product-type";
import { AxiosError } from "axios";

const LIMIT_PAGE = 12;

const fetchProducts = async ({
    pageParam = 0,
    currentCategory,
}: {
    pageParam: number;
    currentCategory: string;
}) => {
    const response = await api.get(
        `/catalogue?search=&category=${currentCategory}&limit=${LIMIT_PAGE}&offset=${pageParam}&platform=marketplace?is_approved=true`
    );
    return response.data;
};

export const useHandleCatalogue = () => {
    const { toast } = useToast();
    const currentCategory = useCategoryStore((state) => state.currentCategory);

    const listCatalogue = useInfiniteQuery({
        queryKey: ["currentCatalogue", currentCategory],
        queryFn: ({ pageParam }) =>
            fetchProducts({
                pageParam,
                currentCategory: currentCategory?.slug || "",
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

    // Mendapatkan produk by toko
    const useProductsByToko = (
        slug_toko: string,
        offset = 0,
        limit = 5,
        enabled = true
    ) => {
        const queryResult = useQuery<
            Product[],
            AxiosError<{ message?: string }>
        >({
            queryKey: ["currentProductToko", slug_toko, offset, limit],
            queryFn: async () => {
                const response = await api.get(
                    `/toko/${slug_toko}?limit=${limit}&offset=${offset}`
                );
                return response.data.data;
            },
            staleTime: 5000,
            enabled,
        });

        if (queryResult.isError && queryResult.error) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil produk toko",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    // Mendapatkan detail produk by toko dan produk slug
    const useProductDetail = (slug_toko: string, slug_products: string) => {
        const queryResult = useQuery<
            DetailProduct,
            AxiosError<{ message?: string }>
        >({
            queryKey: ["currentProduct", slug_products, slug_toko],
            queryFn: async () => {
                const response = await api.get(
                    `/catalogue/${slug_toko}/${slug_products}`
                );
                return response.data.data;
            },
        });

        if (queryResult.isError && queryResult.error) {
            toast({
                variant: "destructive",
                title: "Gagal mengambil detail produk",
                description:
                    queryResult.error.response?.data?.message ||
                    "Terjadi kesalahan",
            });
        }

        return queryResult;
    };

    return {
        listCatalogue,
        useProductsByToko,
        useProductDetail,
    };
};

export type UseHandleCatalogueReturn = ReturnType<typeof useHandleCatalogue>;
