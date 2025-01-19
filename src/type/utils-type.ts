export type TypeDetailProduct = {
    id: number;
    category: TypeCategory;
    comments: TypeComment[];
    country: string;
    created_at: string; // Gantilah tipe dengan `Date` jika diperlukan
    description: string;
    discount: number;
    discount_price: number;
    estimation: string;
    image_urls: string[];
    is_approved: boolean;
    is_for_sale: boolean;
    name: string;
    price: number;
    rating: number;
    slug: string;
    sold: number;
    stock: number;
    toko: TypeToko;
    updated_at: string; // Gantilah tipe dengan `Date` jika diperlukan
    version: number;
    ulasan: TypeUlasan; // New field for review stats
};

type TypeUlasan = {
    total_ulasan: number;
    total_rating: number;
    rating_breakdown: Record<number, number>; // Count of each star rating
};

export type TypeProduct = {
    id: number;
    category: TypeCategory;
    comments: TypeComment[];
    country: string;
    created_at: string; // Gantilah tipe dengan `Date` jika diperlukan
    description: string;
    discount: number;
    discount_price: number;
    estimation: string;
    image_urls: string[];
    is_approved: boolean;
    is_for_sale: boolean;
    name: string;
    price: number;
    rating: number;
    slug: string;
    sold: number;
    stock: number;
    toko: TypeToko;
    updated_at: string; // Gantilah tipe dengan `Date` jika diperlukan
    version: number;
};

export type TypeComment = {
    id: number;
    content: string;
    rating: number;
    user_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    user: TypeUser;
};

export interface TypeToko {
    slug: string;
    name: string;
    image_profile?: string;
    country: string;
    created_at: Date;
    products?: TypeProduct[];
    user_id?: string;
    user?: TypeUser;
}

export interface TypeCategory {
    name?: string;
    slug: string;
    description?: string;
    products?: TypeProduct[];
}

export type TypeUser = {
    id: number;
    googleId?: string; // Optional field
    picture?: string; // Optional field
    username: string;
    email: string;
    password?: never; // Hidden field
    createdAt: string;
    isActive: boolean;
    roleId: number;
};

export type TypeMetaComment = {
    total: number;
    total_page: number;
    limit: number;
    offset: number;
    comment: TypeComment[];
};
