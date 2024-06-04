import { Product, Order } from "../type";
import { getAllProducts, getProductFromId, updateProductFromId } from "./product";

export const createOrder = (requestedProducts: Product[]): Order => {
    const products = getAllProducts();
    const ids: number[] = products.map((p) => p.id);
    const finalOrder: Order = { price: 0, products: [], address: ""};
    requestedProducts.forEach((p) => {
        if(ids.includes(p.id)){
            const matchedProduct: Product | null = getProductFromId(p.id);
            if(matchedProduct && matchedProduct.quantity) {
                const curQuantity = matchedProduct.quantity;
                if(curQuantity && curQuantity > 1) {
                    matchedProduct.quantity -= 1;
                    updateProductFromId(p.id, matchedProduct);
                    finalOrder.products.push(p);
                }
            }
        }
    })
    return finalOrder;
}