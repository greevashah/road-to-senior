import { createOrder } from "./handlers/order";

(async() => {
    try {
        const firstOrder = await createOrder([
            {
                id: 2,
            },
            {
                id: 3,
            },
            {
                id: 1,
            },
            {
                id: 4,
            },
        ]);
        console.log("First Order is", firstOrder);
    }
    catch (error) {
        console.log(error);
    }
})()
