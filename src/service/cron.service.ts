import cron from "node-cron";

/***
 * manage the TTL
 * runs on every fixed time interval and remove expired entries
 *
 * not using mongodb expire indexes as this is fixed value.
 * i need to give different ttls for each entries
 */

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

export function scheduledDBClean() {
    cron.schedule("* * * * *", () => {
        // TODO
        /**
         * tasks:
         *  1. remove expired records
         *  2. if remaining count > max_count remove some records
         *      2.1. how ? -> cache eviction stragies, least accessed, most old
         */
        console.log("running a task every minute");
    });
}
