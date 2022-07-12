/**
 * Manage the db connection and related operations
 * TODO
 */

import { ICache } from "../model/cache.db.model";

/**
 * db operations need to implement
 *
 * 1) insert / update a cache
 * 2) read a cache value by key
 * 3) query all cache keys ( do we need pagination ? )
 * 4) delete a cache by key
 * 5) delete all caches
 * 6) update ttl by key
 */

/** */
export async function save(data: ICache) : Promise<ICache> {
  return {
    createdAt: new Date(),
    expireAt: new Date(),
    key: "",
    value: "",
    ttl: 10
  };
}

export async function read(key: string) : Promise<ICache> {
  return {
    createdAt: new Date(),
    expireAt: new Date(),
    key: "",
    value: "",
    ttl: 10
  };
}

export async function query(from?: number, pageSize?: number): Promise<ICache[]> {
  return [];
}

export async function remove(key: string) : Promise<boolean> {
  return true;
}

export async function removeAll() :  Promise<boolean> {
  return true;
}

export async function updateTTL(obj: ICache, ttl: number) :  Promise<ICache> {
  const expireDate = obj.expireAt || new Date();
  const newExpireDate = new Date(expireDate.getDate() + ttl);
  obj.expireAt = newExpireDate;

  return save(obj);
}