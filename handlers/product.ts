import {products} from "../db/product"
import { Product } from "../type"

export const getAllProducts = (): Product[]  => {
    return products.map((p) => (Object.assign({}, p)) )
}

export const getProductFromId = (id:number): Product | null => {
    const matchedProduct = products.filter((p) => p.id === id);
    const product =  (matchedProduct.length > 0) ? Object.assign({}, matchedProduct[0]) : null
    return product;
}

export const updateProductFromId = (id: number, updatedProduct: Product) => {
    const productIndex = products.findIndex((element) => element.id === id);
    if((productIndex > -1)){
        products[productIndex] = {...updatedProduct}
    }
}