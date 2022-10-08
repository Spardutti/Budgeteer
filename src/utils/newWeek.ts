import { weekOfMonth } from "@utils/weekOfMonth";
import Weekly from "@models/weekly/weekly";
import { DateTime } from "luxon";

export const newWeek = async () => {
    const weekNumber = weekOfMonth();
    const date = DateTime.now();
    const year = date.get("year");
    const month = date.get("month");
    const weeklies = await Weekly.findOne({
        where: {
            week: weekNumber,
            month,
            year,
        },
    });

    if (weeklies) {
        console.log("week already exist");

        return { status: 400, msg: "week already exist" };
    }
    const oldWeeklies = await Weekly.findAll({
        attributes: ["name"],
        group: ["name"],
    });

    let newWeeklies: Weekly[] = [];

    if (oldWeeklies) {
        for (const week of oldWeeklies) {
            const data = await Weekly.create({
                name: week.name,
                ammount: 0,
                week: weekNumber,
                month,
                year,
            });

            newWeeklies.push(data);
        }
    }
    console.log("New week created", newWeeklies);

    return { status: 200, weeklies: newWeeklies };
};
