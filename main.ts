import { createOrder } from "./handlers/order";
import { products } from "./db/product";
// master list of products inventory, in function array of products in input, subtract the demand from investory

try {
    const firstOrder = createOrder([
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

    console.log("Products: ", products);
    console.log("First Order is", firstOrder);
}
catch (error) {
    console.log(error);
}

// promises / error handling
