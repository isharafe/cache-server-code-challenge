/**
 * Manage the db connection and related operations
 */

import { MongoClient } from "mongodb";
import { ICache } from "../model/cache.db.model";
import * as dotenv from "dotenv";

const environment = process.env.NODE_ENV;
dotenv.config({ path: `./env/${environment}.env`});

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

const DEFAULT_PAGE_SIZE = 100;
const NO_SKIP = 0;

export const COLLECTIONS = {
  CACHES: "caches",
};

const dbUri = process.env.DB_CON_URL as string;
const dbName = process.env.DB_NAME;
const mongoClient = new MongoClient(dbUri);
export const database = mongoClient.db(dbName);

/** */
export async function save(data: ICache): Promise<ICache> {
  const caches = database.collection<ICache>(COLLECTIONS.CACHES);

  // update if maching key record found, o/w insert a new record
  const result = await caches.updateOne({key: data.key}, {
    $set: data
  }, {upsert: true});
  const saved = {...data, _id: result.upsertedId};
  return saved;
}

export async function read(key: string): Promise<ICache> {
  const caches = database.collection<ICache>(COLLECTIONS.CACHES);
  const cacheWithId = await caches.findOne({ key: key });
  return cacheWithId as ICache;
}

export async function query(filter?: any, fields?: string[], from?: number, pageSize?: number) : Promise<ICache[]> {

  const caches = database.collection<ICache>(COLLECTIONS.CACHES);
  const selectFields: any = {};
  if(fields && fields.length  > 0) {
    fields.forEach( (f: string) => selectFields[f] = 1);
  }

  const cursor = caches.find(filter, selectFields);

  if (from) {
    cursor
      .sort({ key: -1 })
      .skip(from || NO_SKIP)
      .limit(pageSize || DEFAULT_PAGE_SIZE);
  }

  return await cursor.toArray();
}

export async function remove(key: string): Promise<boolean> {
  const caches = database.collection<ICache>(COLLECTIONS.CACHES);
  const result = await caches.deleteOne({key: key});
  return result.deletedCount > 0;
}

export async function removeByFilter(filter: any) {
  const caches = database.collection<ICache>(COLLECTIONS.CACHES);
  const result = await caches.deleteMany(filter);
  return result.deletedCount;
}

export async function removeAll(): Promise<boolean> {
  const caches = database.collection<ICache>(COLLECTIONS.CACHES);
  const recordCount = await caches.count();
  if(recordCount > 0 ) {
    const result = await caches.deleteMany({});
    return result.deletedCount > 0;
  }

  // no records on db to delete
  return true;
}

export async function updateTTL(obj: ICache, ttl: number): Promise<ICache> {
    const expireDate = obj.expireAt || new Date();
    const newExpireDate = new Date(expireDate.getTime() + ttl);
    obj.expireAt = newExpireDate;

    return save(obj);
}

export async function rowCount(filter: any) : Promise<number> {
  const caches = database.collection<ICache>(COLLECTIONS.CACHES);
  return await caches.find(filter).count();
}