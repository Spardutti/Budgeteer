import { IncomeInterface } from "@interface/interfaces";
import Income from "@models/Income";
import { Request } from "hapi";
import { DateTime } from "luxon";

// ** POST ** //

// TODO TEST ALL INCOME ROUTES
const createUserIncome = async (request: Request) => {
    try {
        const { userId, amount } = request.payload as IncomeInterface;
        const month = DateTime.now().month;
        const year = DateTime.now().year;

        const exist = await Income.findOne({
            where: {
                userId,
                month,
                year,
            },
        });

        if (exist) return { status: 400, err: "Income already exists" };
        const income = await Income.create({
            amount,
            userId,
            month,
            year,
        });

        return { status: 200, income };
    } catch (err) {
        return { status: 400, err: (err as Error).message };
    }
};

export const incomeController = {
    createUserIncome,
};
