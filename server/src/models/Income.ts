import { Optional } from "sequelize";
import {
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    Model,
} from "sequelize-typescript";
import { IncomeInterface } from "@interface/interfaces";
import User from "./user";

interface IncomeCreationAttributes extends Optional<IncomeInterface, "id"> {}

@Table
class Income extends Model<IncomeInterface, IncomeCreationAttributes> {
    @Column(DataType.INTEGER)
    amount!: number;

    @Column(DataType.INTEGER)
    month!: number;

    @Column(DataType.INTEGER)
    year!: number;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}

export default Income;
