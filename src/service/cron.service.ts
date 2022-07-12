import cron from "node-cron";
import * as dotenv from "dotenv";
import { logInfo } from "./log.service";
import * as DBService from "./db.service";
import { ICache } from "../model/cache.db.model";

/* load .env file for the required environment */
/* environment name should be set to NODE_ENV env variable, baed on that related env config file will be loaded */
const environment = process.env.NODE_ENV;
dotenv.config({ path: `./env/${environment}.env`});

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

/***
 * manage the TTL
 * runs on every fixed time interval and remove expired entries
 *
 * not using mongodb expire indexes as this is fixed value.
 * i need to give different ttls for each entries
 */
export const cronSheduleExpression = process.env.CRON_DB_CLEAR_EXECUTION_EXPRESSION as string;

export const startCronDBClearJob = () => {
    cron.schedule(cronSheduleExpression, () => {
        logInfo(`running a db clear task : ${cronSheduleExpression}`);
        removeExpiredCaches();
    });
}

async function removeExpiredCaches() {
    logInfo("removing expired caches");

    const now = new Date();
    const expiredDataCount = await DBService.removeByFilter({expireAt: { $gt: now}});
    logInfo(`Removed ${expiredDataCount} expired rows`);
}

/**
 * https://www.honeybadger.io/blog/nodejs-caching/
 *
 * there are several ways to evict cache
 * 1. Least Recently Used (LRU)
 * 2. Least Frequently Used (LFU)
 * 3. Most Recently Used (MRU)
 * 4. First In, First Out (FIFO)
 *
 * using above 2nd optin LFU, we don't want to keep cache which don't have frquent hits
 */
async function removeExcessiveCaches() {

    const now = new Date();
    const rowCount = await DBService.rowCount({expireAt: { $lt: now}});
    if(rowCount > MAX_CACHE_ENTRIES) {
        logInfo("removing excessive caches with least hit count");
        const db = DBService.database;
        const caches = db.collection<ICache>(DBService.COLLECTIONS.CACHES);

        /**
         * get the db records sort asc by hit count
         * take only excessive row count, using limit
         * delete those records
         */
        await caches.find({}, {sort: {"hitCount": 1}, limit: rowCount - MAX_CACHE_ENTRIES})
        .forEach(record => {
            DBService.remove(record.key);
            logInfo(`Removed ${record.key} cache entry`);
        });
    }
}