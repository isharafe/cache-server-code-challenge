/**
 * TODO
 * The number of entries allowed in the cache is limited. If the maximum amount of cached
items is reached, some old entry needs to be overwritten. Please explain the approach
of what is overwritten in the comments of the source code.

● Every cached item has a Time To Live (TTL). If the TTL is exceeded, the cached data
will not be used. A new random value will then be generated (just like cache miss). The
TTL will be reset on every read/cache hit.

 */

import { randomString } from "../common/util";
import { ICache } from "../model/cache.db.model";
import * as DBService from "./db.service";
import * as LogService from "./log.service";

/**
 * There is a limit to cache store.
 * how can we decide this limit
 * 1). hard code a sensible value
 *      -- easy to use
 *      -- hard to change
 * 2). save this value in db and change as necessary
 *      -- need a ui or an endpoint to update this value
 *      -- easy to manag cache limit
 * 3). write a logic to automatically adjust the max size based on available resources
 *      -- too much work
 *      -- don't need to worry about max size, as system will automatically take care of it
 *
 * for this code assignment, I'll go with above option 1) as it is easy to implement
 */
const MAX_CACHE_ENTRIES = 100;

const DEFAULT_TTL_SECONDS = 1000;

export const set = async (key: string, value: any, ttl?: number) : Promise<ICache> => {

    const now: number = new Date().getTime();
    ttl = ttl || (DEFAULT_TTL_SECONDS * 1000);
    const expireDate = new Date(now + ttl);

    const dbRecord = {
        createdAt: new Date(),
        expireAt: expireDate,
        key: key,
        value: value,
        ttl: ttl
    };

    return DBService.save(dbRecord);
};

export const get = async (key: string) : Promise<string> => {

    const value = await DBService.read(key);
    const now = new Date().getTime();
    let retValue;
    let expireDate = value?.expireAt;

    if(value && expireDate && expireDate?.getTime() >= now) {
        LogService.logInfo("Cache hit");
        DBService.updateTTL(value, value.ttl || (DEFAULT_TTL_SECONDS * 1000));
        retValue = value.value;
    } else {
        LogService.logInfo("Cache miss");
        const newValue = await getLatestValue();
        set(key, newValue, (DEFAULT_TTL_SECONDS * 1000));
        retValue = newValue;
    }

    return retValue;
};

export const getAll = async (from?: number, pageSize?: number) => {
    const objects = await DBService.query(["key"], from, pageSize);
    return objects.map(o => o["key"]);
};

export const remove = async (key: string) => {
    return DBService.remove(key);
};

export const removeAll = async () => {
    return DBService.removeAll();
};

/**
 * use async function assuming the new value will be fetching from a network location
 */
async function getLatestValue() : Promise<string> {
    return randomString();
}