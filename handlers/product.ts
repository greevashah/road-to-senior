import {products} from "../db/product"
import { Product } from "../type"

export const getAllProducts = (): Promise<Product[]>  => {
    return Promise.resolve(products.map((p) => (Object.assign({}, p)) ))
}

export const getProductFromId = (id:number): Promise<Product> => {
    return new Promise((resolve, reject) => {
        const matchedProduct = products.filter((p) => p.id === id);
        if(matchedProduct.length == 0){
            reject("Product not found");
        }
        resolve(Object.assign({}, matchedProduct[0])); // Object.assign is used to avoid pass by reference
    });
}

export const updateProductFromId = async (id: number, updatedProduct: Product): Promise<Product> => {
    const productIndex = products.findIndex((element) => element.id === id);
    if((productIndex == -1)){
        Promise.reject("Update not possible as product not found");
    }
    products[productIndex] = {...updatedProduct}
    return await getProductFromId(id)
}