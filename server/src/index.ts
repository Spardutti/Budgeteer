import "module-alias/register";
import Hapi from "@hapi/hapi";
import routes from "@routes/index";
import sequelize from "@config/db.config";
import { config } from "dotenv";
config();

const url = process.env.BE_URL;
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
    routes(server);
    await server.start();
    // await sequelize.sync({ alter: true });
    console.log(`server running on port ${port} `);
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();

export default server;
