import Income from "@models/income/income";
import { weekOfMonth } from "@utils/weekOfMonth";
import sequelize from "@config/db.config";
import { WeeklyInterface } from "@interface/interfaces";
import Weekly from "@models/weekly/weekly";
import { Request } from "hapi";
import { DateTime } from "luxon";
import { Op } from "sequelize";
import { newWeek } from "@utils/newWeek";

const getWeekly = async () => {
    try {
        const data = await Weekly.findAll();

        return {
            status: 200,
            weeklies: data,
        };
    } catch (error) {
        return error;
    }
};

const createNewWeek = async () => {
    try {
        return newWeek();
    } catch (error) {
        return error;
    }
};

const addWeekly = async (request: Request) => {
    const weekly = request.payload as WeeklyInterface;
    const date = DateTime.now();
    const year = date.year;
    const month = date.month;
    const weekNumber = weekOfMonth();

    try {
        const week = await Weekly.findOne({
            // case insensitive search Op.iLike
            where: { name: { [Op.iLike]: weekly.name } },
        });

        if (week) return { msg: "That name is already in use", status: 400 };
        const data = await Weekly.create({
            name: weekly.name,
            ammount: weekly.ammount,
            month,
            week: weekNumber,
            year,
        });

        return data;
    } catch (error) {
        return error;
    }
};

const addWeeklyAmmount = async (request: Request) => {
    interface AddAmmount {
        ammount: number;
        weeklyId: number;
        add: boolean;
        userId: number;
    }
    const { ammount, weeklyId, add, userId }: AddAmmount =
        request.payload as AddAmmount;

    try {
        const weekly = await Weekly.findByPk(weeklyId);
        const income = await Income.findByPk(userId);

        if (!weekly || !income) return { msg: "Income not found", status: 400 };

        if (add) {
            const week = await weekly.increment("ammount", {
                by: ammount,
            });
            const inco = await income.decrement("ammount", {
                by: ammount,
            });

            return { week, inco };
        } else {
            const week = await weekly.decrement("ammount", {
                by: ammount,
            });
            const inco = await income.increment("ammount", {
                by: ammount,
            });

            return { week, inco };
        }
    } catch (error) {
        return error;
    }
};

const dropTables = async () => {
    try {
        await sequelize.drop();

        return "Tables Dropped";
    } catch (err) {
        return err;
    }
};

export const weeklyController = {
    getWeekly,
    addWeekly,
    addWeeklyAmmount,
    dropTables,
    createNewWeek,
};
