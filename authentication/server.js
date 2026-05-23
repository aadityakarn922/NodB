require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

async function startServer() {
    try {
        console.log("Connecting DB...");

        await connectDB();

        console.log("DB connected, starting server...");

        app.listen(2000, () => {
            console.log("server 2000 is running successfully");
        });

    } catch (error) {
        console.log("SERVER CRASHED:");
        console.log(error);
    }
}

startServer();