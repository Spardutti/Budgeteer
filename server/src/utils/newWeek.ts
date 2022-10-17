import { weekOfMonth } from "@utils/weekOfMonth";
import WeeklyCategory from "@models/weeklyCategory";
import { DateTime } from "luxon";
import User from "@models/user";

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

        if (weeklies) {
            return { status: 400, msg: "week already exist" };
        }
        const oldWeeklies = await WeeklyCategory.findAll({
            where: { userId },
            attributes: ["name"],
            group: ["name"],
        });

        let newWeeklies: WeeklyCategory[] = [];

        if (oldWeeklies) {
            for (const week of oldWeeklies) {
                const data = await WeeklyCategory.create({
                    name: week.name,
                    ammount: 0,
                    week: weekNumber,
                    month,
                    year,
                    userId,
                });

                newWeeklies.push(data);
            }
        }

        return { status: 200, weeklies: newWeeklies };
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};
