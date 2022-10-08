import { incomeController } from "./../controllers/IncomeController/incomeController";
import { weeklyController } from "@controllers/weeklyController/weeklyController";

import { Server } from "@hapi/hapi";
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

    server.route({
        method: "PUT",
        path: "/weekly",
        handler: weeklyController.addWeeklyAmmount,
        options: {
            payload: {
                allow: applicationJson,
            },
        },
    });
    // ##################################################################### //
    // ############################ /* INCOME */ ########################### //
    // ##################################################################### //
    server.route({
        method: "POST",
        path: "/income",
        handler: incomeController.createIncome,
        options: {
            payload: {
                allow: applicationJson,
            },
        },
    });
    server.route({
        method: "POST",
        path: "/monthly/income",
        handler: incomeController.createNewMonthIncome,
        options: {
            payload: {
                allow: applicationJson,
            },
        },
    });

    server.route({
        method: "PUT",
        path: "/income/decrement",
        handler: incomeController.decrementIncomeAmmount,
        options: {
            payload: {
                allow: applicationJson,
            },
        },
    });
    // ##################################################################### //
    // ########################### /* DROP ALL */ ########################## //
    // ##################################################################### //
    server.route({
        method: "GET",
        path: "/drop",
        handler: weeklyController.dropTables,
    });
};

export default routes;
