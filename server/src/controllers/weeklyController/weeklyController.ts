import User from "@models/user";
import { weekOfMonth } from "@utils/weekOfMonth";
import { WeeklyCategoryInterface } from "@interface/interfaces";
import { Request } from "hapi";
import { DateTime } from "luxon";
import { Op } from "sequelize";
import { newWeek } from "@utils/newWeek";
import WeeklyCategory from "@models/weeklyCategory";
import WeeklyExpense from "@models/WeeklyExpense";

// ** GET ** //
const getWeekly = async (request: Request) => {
    try {
        const { userId } = request.query;
        const data = await WeeklyCategory.findAll({
            where: { userId },
            include: [{ model: User, as: "userInfo" }],
        });

        return {
            status: 200,
            weeklies: data,
        };
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};

const getWeekliesByDate = async (request: Request) => {
    const { month, year, week, userId } = request.query;

    try {
        const data = await WeeklyCategory.findAll({
            where: {
                month,
                year,
                week,
                userId,
            },
            include: [{ model: User, as: "userInfo" }],
        });

        return { status: 200, weeklies: data };
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};

// ** POST ** //
const addWeekly = async (request: Request) => {
    interface UserId extends WeeklyCategoryInterface {
        userId: number;
    }
    const { name, ammount, userId } = request.payload as UserId;
    const date = DateTime.now();
    const year = date.year;
    const month = date.month;
    const weekNumber = weekOfMonth();

    try {
        const week = await WeeklyCategory.findOne({
            // case insensitive search Op.iLike
            where: { name: { [Op.iLike]: name } },
        });

        if (week) return { msg: "That name is already in use", status: 400 };
        const weeklyCategory = await WeeklyCategory.create({
            name,
            ammount,
            month,
            week: weekNumber,
            year,
            userId,
        });
        const weeklyExpense = await WeeklyExpense.create({
            userId,
            weeklyCategoryId: weeklyCategory.id,
            amount: 0,
        });

        return { status: 200, weeklyCategory, weeklyExpense };
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};

// ? this will create all WeeklyCategories for each user when a new week starts
const createNewWeek = async (request: Request) => {
    interface UserId {
        userId: number;
    }
    try {
        const data = request.payload as UserId;

        return newWeek(data.userId);
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};

// const addWeeklyAmmount = async (request: Request) => {
//     interface AddAmmount {
//         ammount: number;
//         weeklyId: number;
//         add: boolean;
//         userId: number;
//     }
//     const { ammount, weeklyId, add, userId }: AddAmmount =
//         request.payload as AddAmmount;

//     try {
//         const weekly = await WeeklyCategory.findByPk(weeklyId);
//         const user = await User.findByPk(userId);

//         if (!weekly || !user) return { msg: "Income not found", status: 400 };

//         const wData = await weekly[add ? "increment" : "decrement"]("ammount", {
//             by: ammount,
//         });

//         const uData = await user[!add ? "increment" : "decrement"]("ammount", {
//             by: ammount,
//         });

//         return { status: 200, wData, uData };
//     } catch (err) {
//         return { status: 400, error: (err as Error).message };
//     }
// };

export const weeklyController = {
    getWeekly,
    addWeekly,
    // addWeeklyAmmount,
    createNewWeek,
    getWeekliesByDate,
};
