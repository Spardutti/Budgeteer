import { userController } from "@controllers/userController/userController";
import { Server } from "@hapi/hapi";

const userRoutes = (server: Server) => {
    server.route({
        method: "GET",
        path: "/user",
        handler: userController.getUser,
    });
    server.route({
        method: "POST",
        path: "/user",
        handler: userController.createUser,
    });
};

export default userRoutes;
