/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { ICacheRequest } from "../model/cache.request.model";
import * as CacheService from "../service/cache.service";

/**
 * Router Definition
 */

export const cacheRouter = express.Router();

/**
 * Controller Definitions
 */

// GET all keys
cacheRouter.get("/", async (req: Request, res: Response) => {
    const from: number = parseInt(req.query.from as string, 10);
    const pageSize: number = parseInt(req.query.pageSize as string, 10);

    try {
        const cashes = await CacheService.getAll(from, pageSize);
        res.status(200).send(cashes);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET value for specific key
cacheRouter.get("/:key", async (req: Request, res: Response) => {
    const cacheKey: string = req.params.key;
    try {
        const cache = await CacheService.get(cacheKey);
        res.status(200).send(cache);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST insert/update cache
cacheRouter.post("/:key", async (req: Request, res: Response) => {
    const key: string = req.params.key;

    try {
        const cache: ICacheRequest = req.body;
        const saved = CacheService.set(key, cache);

        // TODO: if new cache, return 201. else if this is an update, return 200
        res.status(200).send(saved);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// DELETE delete a cache key
cacheRouter.delete("/:key", async (req: Request, res: Response) => {
    const key: string = req.params.key;

    try {
        const result = await CacheService.remove(key);
        res.status(204).send(result);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// DELETE all cache
cacheRouter.delete("/", async (req: Request, res: Response) => {
    try {
        const result = await CacheService.removeAll();
        res.status(204).send(result);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});