export interface Product {
    id: number,
    name?: string;
    description?: string;
    isActive?: boolean;
    quantity?: number;
}

export type Order = {
    price: number;
    products: Product[];
    address: string;
}
