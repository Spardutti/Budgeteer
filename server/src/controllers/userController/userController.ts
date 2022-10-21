import { Op } from "sequelize";
import { UserInterface } from "@interface/interfaces";
import User from "@models/user";
import { Request } from "hapi";
import { DateTime } from "luxon";
import { newWeek } from "@utils/newWeek";

// ** GET ** //
const getUser = async (request: Request) => {
    try {
        const { id } = request.query;

        const user = await User.findOne({
            where: {
                id,
            },
        });

        return { status: 200, income: user };
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};

// ** POST  ** //
const createUser = async (request: Request) => {
    try {
        const { name } = request.payload as UserInterface;
        const exist = await User.findOne({
            where: { name: { [Op.iLike]: name } },
        });

        if (exist) return { msg: "User already exist", status: 400 };
        const data = await User.create({
            name,
        });

        return { status: 200, data };
    } catch (err) {
        return { status: 400, error: (err as Error).message };
    }
};

// TODO REVIEW EVERYTHING STARTING FROM HERE
// const addUserToUser = async (request: Request) => {
//     interface Payload {
//         userId: number;
//         users: number;
//     }
//     try {
//         const { userId, users } = request.payload as Payload;
//         const user = await User.findByPk(userId);

//         if (!user) return { status: 400, msg: "User not found" };

//         user.users = users;
//         user.save();

//         return { status: 200, user };
//     } catch (err) {
//         return { status: 400, err: (err as Error).message };
//     }
// };
// TODO REVIEW THIS LOGIC
// const createNewMonthIncome = async () => {
//     const month = DateTime.now().month;
//     const year = DateTime.now().year;

//     try {
//         const oldIncomes = await User.findOne({
//             where: {
//                 month,
//                 year,
//             },
//         });

//         if (oldIncomes) return { status: 400, msg: "Income exist" };
//         const incomeToCreate = await User.findAll({
//             attributes: ["user"],
//             group: ["user"],
//         });
//         const newIncomes: User[] = [];

//         for (const i of incomeToCreate) {
//             const income = await User.create({
//                 user: i.user,
//                 month,
//                 ammount: 0,
//                 year,
//             });

//             newIncomes.push(income);
//         } //TODO FIX USER ID
//         const newWeeklies = await newWeek(1);

//         return {
//             status: 200,
//             msg: "New Monthly income created",
//             weeklies: newWeeklies?.weeklies,
//             incomes: newIncomes,
//         };
//     } catch (err) {
//         return { status: 400, error: (err as Error).message };
//     }
// };

// const decrementIncomeAmmount = async (request: Request) => {
//     interface EditAmmount {
//         id: number;
//         ammount: number;
//         add: boolean;
//     }
//     const values = request.payload as EditAmmount;

//     try {
//         const user = await User.findByPk(values.id);

//         return user
//             ? await user[values.add ? "increment" : "decrement"]("ammount", {
//                   by: values.ammount,
//               })
//             : { msg: "User not found", status: 400 };
//     } catch (err) {
//         return { status: 400, error: (err as Error).message };
//     }
// };

// const getMonthIncome = async (request: Request) => {
//     const { month, year } = request.query;

//     try {
//         const income = await User.findAll({
//             where: {
//                 month: month,
//                 year: year,
//             },
//         });

//         return { status: 200, income };
//     } catch (err) {
//         return { status: 400, error: (err as Error).message };
//     }
// };

export const userController = {
    createUser,
    // createNewMonthIncome,
    // decrementIncomeAmmount,
    // getMonthIncome,
    getUser,
};
