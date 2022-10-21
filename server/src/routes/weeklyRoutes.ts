import { weeklyController } from "@controllers/weeklyController/weeklyController";
import { Server } from "@hapi/hapi";

const weeklyCategoriesRoutes = (server: Server) => {
    server.route({
        method: "GET",
        path: "/weekly",
        handler: weeklyController.getWeekly,
    });
    server.route({
        method: "GET",
        path: "/weekly/filtered",
        handler: weeklyController.getWeekliesByDate,
    });

    server.route({
        method: "POST",
        path: "/weekly",
        handler: weeklyController.addWeekly,
    });

    server.route({
        method: "POST",
        path: "/week",
        handler: weeklyController.createNewWeek,
    });

    // server.route({
    //     method: "PUT",
    //     path: "/weekly",
    //     handler: weeklyController.addWeeklyAmmount,
    //     options: {
    //         payload: {
    //             allow: applicationJson,
    //         },
    //     },
    // });
};

export default weeklyCategoriesRoutes;
