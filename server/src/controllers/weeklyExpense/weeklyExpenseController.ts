import WeeklyExpense from "@models/WeeklyExpense";

const create = async () => {
    const t = await WeeklyExpense.create({
        userId: 1,
        weeklyCategoryId: 1,
        amount: 0,
    });
};

export = {};
