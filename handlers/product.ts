import { Product } from "../type"
import { readingFile, writingToFile } from "./file"

const fileName = "product.json"

export const getAllProducts = async (): Promise<Product[]>  => {
    try {
        const productJsonString = await readingFile(fileName);
        const products:Product[] = JSON.parse(productJsonString);
        return Promise.resolve(products);
    }
    catch(err) {
        throw err;
    }
}

export const getProductFromId = (id:number): Promise<Product> => {
    try {
        return new Promise(async (resolve, reject) => {
            const products = await getAllProducts();
            const matchedProduct = products.filter((p) => p.id === id);
            if(matchedProduct.length == 0){
                reject("Product not found");
            }
            resolve(Object.assign({}, matchedProduct[0])); // Object.assign is used to avoid pass by reference
        });
    } catch(err) {
        throw err;
    }
}

export const updateProductFromId = async (id: number, updatedProduct: Product): Promise<Product> => {
    try {
        const products = await getAllProducts();
        const productIndex = products.findIndex((element) => element.id === id);
        if((productIndex == -1)){
            Promise.reject("Update not possible as product not found");
        }
        products[productIndex] = {...updatedProduct}
        await writingToFile(fileName, JSON.stringify(products));
        return await getProductFromId(id)
    } catch(err) {
        throw err;
    }
}

// const start = async () => await getAllProducts();
// start();