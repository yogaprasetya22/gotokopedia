import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Cart, CartItem, CartStore, MetaCart } from "@/type/cart-checkout-type";
import { Product, Toko } from "@/type/toko-product-type";
import { useToast } from "./use-toast";

const LIMIT_PAGE = 10;

const getCart = async ({
  pageParam = 0,
  sort = "desc",
}: {
  pageParam?: number;
  sort?: string;
}) => {
  const response = await api.get(`/cart?limit=${LIMIT_PAGE}&offset=${pageParam}&sort=${sort}`);
  return response.data.data;
};

export const useCartQuery = () => {
  const query = useInfiniteQuery({
    queryKey: ["cart"],
    queryFn: ({ pageParam = 0 }) => getCart({ pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.cart?.stores?.length < LIMIT_PAGE ? null : allPages.length + 1,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

     const stores = query.data?.pages.flatMap((page) => page?.cart?.stores || []) ?? [] as (CartStore & {
    toko: Toko;
    items: (CartItem & {
      product: Product;
    })[];
  })[];

  const carts = query.data?.pages[0];

  return {
    ...query,
    carts,
    stores,
  };
};

interface MutationContext {
  previousCart?: InfiniteData<Cart>;
}

export const useCartMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const baseOptions = {
    onMutate: async <T>(variables: T): Promise<MutationContext> => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]) as InfiniteData<Cart> | undefined;
      return { previousCart };
    },
    onError: <T>(error: Error, variables: T, context?: MutationContext) => {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses permintaan",
        variant: "destructive",
      });
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  };

  const increaseQuantity = useMutation<void, Error, string, MutationContext>({
    mutationFn: async (cartStoreItemID: string) => {
      await api.patch(`/cart/item/${cartStoreItemID}/increase`);
    },
    ...baseOptions,
  });

  const decreaseQuantity = useMutation<void, Error, string, MutationContext>({
    mutationFn: async (cartStoreItemID: string) => {
      await api.patch(`/cart/item/${cartStoreItemID}/decrease`);
    },
    ...baseOptions,
  });

  const createCart = useMutation<void, Error, { product_id: number; quantity: number }, MutationContext>({
    mutationFn: async ({ product_id, quantity }) => {
      await api.post("cart", { product_id, quantity });
    },
    ...baseOptions,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Item berhasil ditambahkan ke keranjang",
      });
    },
  });

  const deleteItem = useMutation<void, Error, string, MutationContext>({
    mutationFn: async (cartStoreItemID: string) => {
      await api.delete(`/cart/item/${cartStoreItemID}/delete`);
    },
    ...baseOptions,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Item berhasil dihapus dari keranjang",
      });
    },
  });

  return {
    increaseQuantity,
    decreaseQuantity,
    createCart,
    deleteItem,
  };
};

export const useHandleCart = () => {
  const { carts, stores, ...queryRest } = useCartQuery();
  const {
    increaseQuantity,
    decreaseQuantity,
    createCart,
    deleteItem,
  } = useCartMutations();

  return {
    carts,
    stores,
    increaseQuantity,
    decreaseQuantity,
    createCart,
    deleteItem,
    ...queryRest,
  };
};

export type useHandleCartReturn = ReturnType<typeof useHandleCart>;
