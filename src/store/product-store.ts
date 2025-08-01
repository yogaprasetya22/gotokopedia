import { Category, Product } from "@/type/toko-product-type";
import { useMemo } from "react";
import { create } from "zustand";

export interface ICategoryStore {
    currentCategory: Category;
    setCurrentCategory: (category: Category) => void;
}

export interface ICatalogueStore {
    isNextPageLoading: boolean;
    setNextPageLoading: (isLoading: boolean) => void;
    catalogue: Product[];
    clearCatalogue: () => void;
    setCatalogue: (catalogue: Product[]) => void;
    addCatalogue: (catalogue: Product[]) => void;
}

export interface IPageStore {
    page: number;
    totalPages: number;
    clearPage: () => void;
    setPage: (page: number) => void;
    addPage: () => void;
    setTotalPages: (totalPages: number) => void;
}

export const useCategoryStore = create<ICategoryStore>((set) => ({
    currentCategory: { slug: "pc-gaming" }, // Default category
    setCurrentCategory: (category: Category) =>
        set({ currentCategory: category }),
}));

export const useCatalogueStore = create<ICatalogueStore>((set) => ({
    isNextPageLoading: false,
    setNextPageLoading: (isLoading: boolean) =>
        set({ isNextPageLoading: isLoading }),
    catalogue: [] as Product[], // Ganti `any[]` dengan `Product[]`
    clearCatalogue: () => set({ catalogue: [] }),
    setCatalogue: (catalogue: Product[]) => set({ catalogue }), // Ganti `any[]` dengan `Product[]`
    addCatalogue: (catalogue: Product[]) =>
        set((state) => ({
            catalogue: [...state.catalogue, ...catalogue],
        })),
}));

export const usePageStore = create<IPageStore>((set) => ({
    page: 1,
    totalPages: 1,
    clearPage: () => set({ page: 1 }),
    setPage: (page: number) => set({ page }),
    addPage: () => set((state) => ({ page: state.page + 1 })),
    setTotalPages: (totalPages: number) => set({ totalPages }),
}));

export const useManageCategory = () => {
    const setCurrentCategory = useCategoryStore(
        (state) => state.setCurrentCategory
    );
    const clearCatalogue = useCatalogueStore((state) => state.clearCatalogue);
    const clearPage = usePageStore((state) => state.clearPage);

    const changeCategory = useMemo(
        () => (category: Category) => {
            setCurrentCategory(category);
            clearCatalogue();
            clearPage();
        },
        [setCurrentCategory, clearCatalogue, clearPage]
    );

    return { changeCategory };
};
