import { uuid } from "uuidv4";
import { Order,BodyType } from "../type";
import { readingFile, writingToFile } from "./file";
import { getAllProducts, getProductFromId, updateProductFromId } from "./product";
import { ERROR_MESSAGES, CustomError } from "../common/error"
import {ORDER_DB_FILE} from '../common/config'

// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

const filename = ORDER_DB_FILE as string;

export const getOrderFromId = (id: string): Promise<Order> => {
    return new Promise(async (resolve, reject) => {
        const orders = await getAllOrders();
        const order = orders.filter((o) => o.id === id);
        if(order.length === 0 ){
            reject({message: "Given order does not exist", code: ERROR_MESSAGES.NOT_FOUND});
        }
        resolve(Object.assign({}, order[0]));
    })
}

export const getAllOrders = async (): Promise<Order[]> => {
    const orders: Order[] = JSON.parse(await readingFile(filename));
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
                        throw new CustomError({ message: `Given product with id ${p.id} does not sufficient quantity`, code: ERROR_MESSAGES.BAD_REQUEST });
                    }
                    else if (!matchedProduct.isActive) {
                        throw new CustomError({ message: `Given product with id ${p.id} is not active`, code: ERROR_MESSAGES.BAD_REQUEST });
                    }
                    matchedProduct.quantity -= 1;
                    await updateProductFromId(p.id, matchedProduct);
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