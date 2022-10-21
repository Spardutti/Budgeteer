import "module-alias/register";
import Hapi from "@hapi/hapi";
import incomeRoutes from "@routes/incomeRoutes";
import userRoutes from "@routes/userRoutes";
import weeklyCategoriesRoutes from "@routes/weeklyRoutes";
import etcRoutes from "@routes/etc";
import { config } from "dotenv";
config();

const port = process.env.PORT || 5000;
const server = new Hapi.Server({
    host: "0.0.0.0",
    port,
    routes: {
        cors: {
            origin: ["*"], // an array of origins or 'ignore'
        },
    },
    debug: { request: ["error"] },
});

const init = async () => {
    incomeRoutes(server);
    weeklyCategoriesRoutes(server);
    userRoutes(server);
    etcRoutes(server);
    await server.start();
    console.log(`server running on port ${port} `);
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();

export default server;
