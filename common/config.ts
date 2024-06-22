import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT;
export const ORDER_DB_FILE = process.env.ORDER_DB_FILE;
export const PRODUCT_DB_FILE = process.env.PRODUCT_DB_FILE;