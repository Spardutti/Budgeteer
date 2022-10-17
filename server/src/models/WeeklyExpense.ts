import WeeklyCategory from "@models/weeklyCategory";
import sequelize from "@config/db.config";
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import User from "./user";

class WeeklyExpense extends Model<
    InferAttributes<WeeklyExpense>,
    InferCreationAttributes<WeeklyExpense>
> {
    declare weeklyCategoryId: number;
    declare userId: number;
    declare amount: number;
    declare id: CreationOptional<number>;
}

WeeklyExpense.init(
    {
        amount: {
            type: DataTypes.INTEGER,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        weeklyCategoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: WeeklyCategory,
                key: "id",
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "Weekly Expense",
    }
);

export default WeeklyExpense;
