import { Product, Order } from "../type";
import { getAllProducts, getProductFromId, updateProductFromId } from "./product";

export const createOrder = (requestedProducts: Product[]): Order => {
    try {
        const products = getAllProducts();
        const ids: number[] = products.map((p) => p.id);
        const finalOrder: Order = { price: 0, products: [], address: ""};
        requestedProducts.forEach((p) => {
            if(ids.includes(p.id)){
                const matchedProduct: Product = getProductFromId(p.id);
                if(matchedProduct) {
                    if(!matchedProduct.quantity) {
                        throw new Error("Quantity of requested product is 0");
                    }
                    else if(!matchedProduct.isActive) {
                        throw new Error("Requested product is inactive")
                    }
                    matchedProduct.quantity -= 1;
                    updateProductFromId(p.id, matchedProduct);
                    finalOrder.products.push(p);
                }
            }
        })
        return finalOrder;
    } catch (err) {
        throw err;
    }
}