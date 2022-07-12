/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { ICacheRequest } from "../model/cache.request.model";
/**
 * Router Definition
 */

export const cacheRouter = express.Router();

/**
 * Controller Definitions
 */

// GET all keys
cacheRouter.get("/", async (req: Request, res: Response) => {
    try {
        // TODO
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET value for specific key
cacheRouter.get("/:key", async (req: Request, res: Response) => {
    const cacheKey: string = req.params.key;
    try {
        // TODO
        /**
         * If the key is not found in the cache:
            ■ Log an output “Cache miss”
            ■ Create a random string
            ■ Update the cache with this random string
            ■ Return the random string
        ○ If the key is found in the cache:
            ■ Log an output “Cache hit”
            ■ Get the data for this key
            ■ Return the data
         */
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST insert/update cache
cacheRouter.post("/", async (req: Request, res: Response) => {
    try {
        const cache: ICacheRequest = req.body;
        const cacheKey = cache.key;

        // TODO: insert/update cache

        res.status(201).send(/* TODO */);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// PUT update value of a key
cacheRouter.put("/:key", async (req: Request, res: Response) => {
    const key: string = req.params.key;
    try {
        const cache: ICacheRequest = req.body;
        cache.key = key;    // make sure the key value is consistent

        // TODO

        res.status(200).send(/* TODO */);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// DELETE delete a cache key
cacheRouter.delete("/:key", async (req: Request, res: Response) => {
    const key: string = req.params.key;

    try {
        // TODO

        res.status(204).send(/* TODO */);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// DELETE all cache
cacheRouter.delete("/", async (req: Request, res: Response) => {
    try {
        // TODO

        res.status(204).send(/* TODO */);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});