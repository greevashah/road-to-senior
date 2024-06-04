import { Order } from "../type";
import { products } from "./product"

const order: Order = {
    price: 100,
    products: [...products.map((el) => ({...el}))],
    address: "Mulund",
}