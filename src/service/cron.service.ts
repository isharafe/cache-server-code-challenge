import cron from "node-cron";

/***
 * manage the TTL
 * runs on every fixed time interval and remove expired entries
 *
 * not using mongodb expire indexes as this is fixed value.
 * i need to give different ttls for each entries
 */

cron.schedule("* * * * *", () => {
    // TODO
    console.log("running a task every minute");
});
