import { Op } from "sequelize";
import { IncomeInterface } from "@interface/interfaces";
import Income from "@models/income/income";
import { Request } from "hapi";
import { DateTime } from "luxon";
import { newWeek } from "@utils/newWeek";

const createIncome = async (request: Request) => {
    try {
        const { ammount, user } = request.payload as IncomeInterface;
        const exist = await Income.findOne({
            where: { user: { [Op.iLike]: user } },
        });
        const date = DateTime.now();
        const year = date.year;
        const month = date.month;

        if (exist) return { msg: "Income already exist", status: 400 };
        const data = await Income.create({ user, ammount, month, year });

        return { status: 200, data };
    } catch (error) {
        return error;
    }
};

const createNewMonthIncome = async () => {
    const month = DateTime.now().month;
    const year = DateTime.now().year;

    try {
        const oldIncomes = await Income.findOne({
            where: {
                month,
                year,
            },
        });

        if (oldIncomes) return { status: 400, msg: "Income exist" };
        const incomeToCreate = await Income.findAll({
            attributes: ["user"],
            group: ["user"],
        });
        const newIncomes: Income[] = [];

        for (const i of incomeToCreate) {
            const income = await Income.create({
                user: i.user,
                month,
                ammount: 0,
                year,
            });

            newIncomes.push(income);
        }
        const newWeeklies = await newWeek();

        return {
            status: 200,
            msg: "New Monthly income created",
            weeklies: newWeeklies?.weeklies,
            incomes: newIncomes,
        };
    } catch (error) {
        return error;
    }
};

const decrementIncomeAmmount = async (request: Request) => {
    interface EditAmmount {
        id: number;
        ammount: number;
    }
    const values = request.payload as EditAmmount;

    try {
        const user = await Income.findByPk(values.id);

        user
            ? await user.decrement("ammount", {
                  by: values.ammount,
              })
            : { msg: "User not found", status: 400 };

        return user;
    } catch (error) {
        return error;
    }
};

export const incomeController = {
    createIncome,
    createNewMonthIncome,
    decrementIncomeAmmount,
};
