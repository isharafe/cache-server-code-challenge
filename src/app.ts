/**
* Required External Modules
*/

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
// import { authRouter, openIdAuthConnect } from "./controller/auth.controller";
import { cacheRouter } from "./controller/cache.controller";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { startCronDBClearJob } from "./service/cron.service";

/* load .env file for the required environment */
/* environment name should be set to NODE_ENV env variable, baed on that related env config file will be loaded */
const environment = process.env.NODE_ENV;
dotenv.config({ path: `./env/${environment}.env`});


/**
 * App Variables
 */

const app = express();

/**
 *  App Configuration
 */

/* helps to secure Express apps by setting various HTTP headers */
app.use(helmet());
/* enable and configure cross domain requests */
app.use(cors());
/* parses incoming requests with JSON payloads */
app.use(express.json());

app.use("/api/cache", cacheRouter);
 
 /** error handler function should register
  * after all routes are registered.
  * this fn should have four arguments.
  * o/w express don't recognize this as error handler
  * */
app.use(errorHandler);

 /**
  * route not found won't be handled from error handler.
  * register this as the last middleware.
  * so that all the things didn't catch above,
  * will be catched from here.
  */
app.use(notFoundHandler);

/**
 * start the cron job.
 * this will clear expired caches and excessive caches from db
 */
startCronDBClearJob();

/**
 * start the server on separate file.
 * That way test cases can use this app for testing purposes
 */
export default app;