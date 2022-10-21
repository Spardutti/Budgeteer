import { incomeController } from "@controllers/incomeController/incomeController";
import { Server } from "@hapi/hapi";

const incomeRoutes = (server: Server) => {
    server.route({
        method: "POST",
        path: "/income",
        handler: incomeController.createUserIncome,
    });
};

export default incomeRoutes;
