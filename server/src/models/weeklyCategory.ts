import WeeklyExpense from "@models/WeeklyExpense";
// import {
//     Model,
//     InferAttributes,
//     InferCreationAttributes,
//     DataTypes,
//     CreationOptional,
//     ForeignKey,
// } from "sequelize";
// import sequelize from "@config/db.config";

import { WeeklyCategoryInterface } from "@interface/interfaces";
import { Optional } from "sequelize";
import {
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import User from "./user";

interface WeeklyCategoryAttributes
    extends Optional<WeeklyCategoryInterface, "id"> {}

@Table
class WeeklyCategory extends Model<
    WeeklyCategoryInterface,
    WeeklyCategoryAttributes
> {
    @Column
    name!: string;

    @Column
    year!: number;

    @Column
    month!: number;

    @Column
    week!: number;

    @Column
    ammount!: number;

    @BelongsTo(() => User)
    userInfo!: User;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsToMany(() => User, () => WeeklyExpense)
    expense!: WeeklyExpense[];
}

export default WeeklyCategory;
