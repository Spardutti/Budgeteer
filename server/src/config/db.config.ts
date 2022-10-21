import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import User from "@models/user";
import Income from "@models/Income";
import WeeklyCategory from "@models/weeklyCategory";
import WeeklyExpense from "@models/WeeklyExpense";
config();

const sequelize = new Sequelize(process.env.DB_URL as string, {
    dialect: "postgres",
    models: [User, Income, WeeklyCategory, WeeklyExpense],
});

export default sequelize;
