import { Product, Order } from "../type";
import { getAllProducts, getProductFromId, updateProductFromId } from "./product";

export const createOrder = async (requestedProducts: Product[]): Promise<Order> => {
    try {
        const products = await getAllProducts();
        const ids: number[] = products.map((p) => p.id);
        const finalOrder: Order = { price: 0, products: [], address: ""};
        // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
        await Promise.all(requestedProducts.map(async (p) => {
            if(ids.includes(p.id)){
                const matchedProduct = await getProductFromId(p.id); // on reject, catch will be called
                if(!matchedProduct.quantity) {
                    throw new Error("Quantity of requested product is 0");
                }
                else if(!matchedProduct.isActive) {
                    throw new Error("Requested product is inactive")
                }
                matchedProduct.quantity -= 1;
                await updateProductFromId(p.id, matchedProduct);
                finalOrder.products.push(p);
            }
        }));
        return finalOrder;
    } catch (err) {
        throw err;
    }
}