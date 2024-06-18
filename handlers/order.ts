import { uuid } from "uuidv4";
import { Order,BodyType } from "../type";
import { readingFile, writingToFile } from "./file";
import { getAllProducts, getProductFromId, updateProductFromId } from "./product";

// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

const filename = "order.json";

export const getOrderFromId = (id: string): Promise<Order> => {
    return new Promise(async (resolve, reject) => {
        const orders = await getAllOrders();
        const order = orders.filter((o) => o.id === id);
        if(order.length === 0 ){
            reject("Could Not find order");
        }
        resolve(Object.assign({}, order[0]));
    })
}

export const getAllOrders = async (): Promise<Order[]> => {
    const orders: Order[] = JSON.parse(await readingFile(filename));
    console.log("ordrs: ", orders);
    return Promise.resolve(orders);
}

export const createOrder = async (requestedProducts:BodyType[]) => {
        const finalOrder: Order = { id: uuid(), price: 0, products: [], address: "" };
        const products = await getAllProducts();
        const ids: number[] = products.map((p) => p.id);
        try {
        await Promise.all(requestedProducts.map(async (p) => {
            if (ids.includes(p.id)) {
                const matchedProduct = await getProductFromId(p.id); // on reject, catch will be called
                if (!matchedProduct.quantity) {
                    throw new Error("Quantity of requested product is 0");
                }
                else if (!matchedProduct.isActive) {
                    throw new Error("Requested product is inactive")
                }
                console.log("matchedProduct before is: ", matchedProduct);
                matchedProduct.quantity -= 1;
                await updateProductFromId(p.id, matchedProduct);
                console.log("matchedProduct is: ", matchedProduct);
                finalOrder.products.push(matchedProduct);
            }
        }));
        const orders = await getAllOrders();
        orders.push(finalOrder);
        await writingToFile(filename , JSON.stringify(orders))
        return finalOrder;
        } catch (err) {
            throw err;
        }
}