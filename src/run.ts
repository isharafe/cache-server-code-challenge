import app from "./app";
import * as dotenv from "dotenv";

/* load .env file for the required environment */
/* environment name should be set to NODE_ENV env variable, baed on that related env config file will be loaded */
const environment = process.env.NODE_ENV;
dotenv.config({ path: `./env/${environment}.env`});

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 * Server Activation
 */
 app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
});