import { createOrder } from "./handlers/order";
import { products } from "./db/product";
// master list of products inventory, in function array of products in input, subtract the demand from investory

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
console.log(firstOrder, "First Order is");
// To Do:
// get / update product function from id
// modularity in the code
// promises / error handling
