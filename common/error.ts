import { FastifyReply } from "fastify";
import { CustomErrorInterface } from "../type";

export const ERROR_MESSAGES = { 
    NOT_FOUND: "Resource Not Found",
    BAD_REQUEST: "Bad Request",
}

const ERROR_STATUS_CODE: Record<string, number> = {
    [ERROR_MESSAGES.BAD_REQUEST]: 400,
    [ERROR_MESSAGES.NOT_FOUND]: 404,
}

export const sendError = (reply: FastifyReply, err: any) => {
    const errorCode = ERROR_STATUS_CODE[err.code] ?? 500;
    reply.code(errorCode);
    reply.send(err);
}

export class CustomError extends Error {
    readonly code: string;
    constructor({ message, code }: CustomErrorInterface ){
        super(message);
        this.code = code;
    }
}