import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
    requst: Request,
    response: Response,
    next: NextFunction
) => {
    const message = "Resource not found";
    response.status(400).send(message);
};