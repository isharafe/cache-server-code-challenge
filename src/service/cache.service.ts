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
        updateTTL(value, value.ttl || (DEFAULT_TTL_SECONDS * 1000));
        retValue = value.value;
    } else {
        LogService.logInfo("Cache miss");
        const newValue = await getLatestValue();
        set(key, newValue, (DEFAULT_TTL_SECONDS * 1000));
        retValue = newValue;
    }

    return retValue;
};

export const getAll = async () => {
    return DBService.query();
};

export const remove = async (key: string) => {
    return DBService.remove(key);
};

export const removeAll = async () => {
    return DBService.removeAll();
};

async function updateTTL(obj: ICache, ttl: number): Promise<ICache> {
    const expireDate = obj.expireAt || new Date();
    const newExpireDate = new Date(expireDate.getTime() + ttl);
    obj.expireAt = newExpireDate;

    return DBService.save(obj);
}

export const clearOldRecord = async () => {

};

/**
 * use async function assuming the new value will be fetching from a network location
 */
async function getLatestValue() : Promise<string> {
    return randomString();
}