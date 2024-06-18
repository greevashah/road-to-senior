export interface Product {
    id: number,
    name?: string;
    description?: string;
    isActive?: boolean;
    quantity?: number;
}

export type Order = {
    id: string,
    price: number;
    products: Product[];
    address: string;
}

export type BodyType = { id: number, quantity: number }
