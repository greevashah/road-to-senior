import {products} from "../db/product"
import { Product } from "../type"

export const getAllProducts = (): Product[]  => {
    return products.map((p) => (Object.assign({}, p)) )
}

export const getProductFromId = (id:number): Product => {
    const matchedProduct = products.filter((p) => p.id === id);
    if(matchedProduct.length == 0){
        throw new Error("Product not found");
    }
    return Object.assign({}, matchedProduct[0]);
}

export const updateProductFromId = (id: number, updatedProduct: Product) => {
    const productIndex = products.findIndex((element) => element.id === id);
    if((productIndex == -1)){
        throw new Error("Update not possible as product not found");
    }
    products[productIndex] = {...updatedProduct}
}