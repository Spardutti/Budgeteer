import { weekOfMonth } from "@utils/weekOfMonth";
import WeeklyCategory from "@models/weeklyCategory";
import { DateTime } from "luxon";
import WeeklyExpense from "@models/WeeklyExpense";
import sequelize from "@config/db.config";

export const newWeek = async (userId: number) => {
    try {
        const weekNumber = weekOfMonth();
        const date = DateTime.now();
        const year = date.get("year");
        const month = date.get("month");
        const weeklies = await WeeklyCategory.findOne({
            where: {
                week: weekNumber,
                month,
                year,
                userId,
            },
        });

        // ? if the week exist we do nothing
        if (weeklies) {
            return { status: 400, msg: "week already exist" };
        }

        // ? we get all the existing caregories for the user
        const oldWeeklies = await WeeklyCategory.findAll({
            where: { userId },
            attributes: [
                [sequelize.fn("DISTINCT", sequelize.col("name")), "name"],
                "id",
            ],
        });

        let newWeeklies: WeeklyCategory[] = [];
        let newExpenses: WeeklyExpense[] = [];

        // ? we create a the old category with the new week number
        if (oldWeeklies) {
            for (const weekly of oldWeeklies) {
                const newWeekly = WeeklyCategory.build({
                    name: weekly.name,
                    ammount: 0,
                    week: weekNumber,
                    month,
                    year,
                    userId,
                });

                const weeklyExpense = WeeklyExpense.build({
                    userId,
                    weeklyCategoryId: newWeekly.id,
                    amount: 0,
                });

                newExpenses.push(weeklyExpense);
                newWeeklies.push(newWeekly);
                // ? wait until everything succeeded to save & avoid errors
                newWeekly.save();
                weeklyExpense.save();
            }
        }

        return { status: 200, weeklies: newWeeklies, expenses: newExpenses };
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};
