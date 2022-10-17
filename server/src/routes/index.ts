import { familyUserController } from "./../controllers/familyController/familyController";
import { userController } from "../controllers/userController/userController";
import { weeklyController } from "@controllers/weeklyController/weeklyController";
import { incomeController } from "@controllers/incomeController/incomeController";

import { Server } from "@hapi/hapi";
import sequelize from "@config/db.config";
const applicationJson = "application/json";

const routes = (server: Server) => {
    // ##################################################################### //
    // ########################### /* WEEKLIES */ ########################## //
    // ##################################################################### //
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
        options: {
            payload: {
                allow: applicationJson,
            },
        },
    });

    server.route({
        method: "POST",
        path: "/week",
        handler: weeklyController.createNewWeek,
        options: {
            payload: {
                allow: applicationJson,
            },
        },
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

    // ** USER
    // server.route({
    //     method: "GET",
    //     path: "/user",
    //     handler: userController.getMonthIncome,
    // });

    server.route({
        method: "GET",
        path: "/familyuser",
        handler: userController.getUserFamily,
    });

    server.route({
        method: "GET",
        path: "/user/get",
        handler: userController.getUser,
    });

    server.route({
        method: "POST",
        path: "/user",
        handler: userController.createUser,
        options: {
            payload: {
                allow: applicationJson,
            },
        },
    });
    // server.route({
    //     method: "POST",
    //     path: "/monthly/income",
    //     handler: userController.createNewMonthIncome,
    //     options: {
    //         payload: {
    //             allow: applicationJson,
    //         },
    //     },
    // });

    // server.route({
    //     method: "PUT",
    //     path: "/income/decrement",
    //     handler: userController.decrementIncomeAmmount,
    //     options: {
    //         payload: {
    //             allow: applicationJson,
    //         },
    //     },
    // });
    // * * INCOME CONTOLLER ** //
    server.route({
        method: "POST",
        path: "/income",
        handler: incomeController.createUserIncome,
        options: {
            payload: { allow: applicationJson },
        },
    });

    // ** FAMILY USER CONTROLLER ** //

    server.route({
        method: "POST",
        path: "/familyuser",
        handler: familyUserController.createFamilyUser,
        options: { payload: { allow: applicationJson } },
    });

    // !! DROP ALL
    server.route({
        method: "GET",
        path: "/drop",
        handler: weeklyController.dropTables,
    });
    server.route({
        method: "GET",
        path: "/sync",
        handler: async () => {
            await sequelize.sync({ alter: true });

            return "Synced";
        },
    });
};

export default routes;
