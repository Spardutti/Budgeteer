// import WeeklyCategory from "@models/weeklyCategory";
// import sequelize from "@config/db.config";
// import {
//     CreationOptional,
//     DataTypes,
//     InferAttributes,
//     InferCreationAttributes,
//     Model,
// } from "sequelize";
// import User from "./user";

import { WeeklyExpenseInterface } from "@interface/interfaces";
import { Optional } from "sequelize";
import {
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import User from "./user";
import WeeklyCategory from "./weeklyCategory";

interface WeeklyExpenseAttributes
    extends Optional<WeeklyExpenseInterface, "id"> {}

@Table
class WeeklyExpense extends Model<
    WeeklyExpenseInterface,
    WeeklyExpenseAttributes
> {
    @PrimaryKey
    @Column({ autoIncrement: true, unique: true })
    id!: number;

    @Column
    amount!: number;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => WeeklyCategory)
    @Column
    weeklyCategoryId!: number;
}

export default WeeklyExpense;
