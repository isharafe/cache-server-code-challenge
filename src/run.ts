import app from "./app";

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