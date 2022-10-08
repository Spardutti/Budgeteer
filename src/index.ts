import "module-alias/register";
import Hapi from "@hapi/hapi";
import routes from "@routes/index";
import sequelize from "@config/db.config";
import { config } from "dotenv";
config();

const port = process.env.PORT;
const server = new Hapi.Server({
    port,
    host: "localhost",
    routes: {
        cors: {
            origin: ["*"], // an array of origins or 'ignore'
        },
    },
    debug: { request: ["error"] },
});

const init = async () => {
    routes(server);
    await server.start();
    await sequelize.sync();
    console.log(`server running on port ${port}`);
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();

export default server;
