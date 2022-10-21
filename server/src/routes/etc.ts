import sequelize from "@config/db.config";
import { Server } from "@hapi/hapi";

const etcRoutes = (server: Server) => {
    server.route({
        method: "GET",
        path: "/sync",
        handler: async () => {
            await sequelize.sync({ alter: true });

            return "Synced";
        },
    });
    server.route({
        method: "GET",
        path: "/drop",
        handler: async () => {
            await sequelize.drop({ cascade: true });
            await sequelize.sync({ alter: true });

            return "Tables droped";
        },
    });
};

export default etcRoutes;
