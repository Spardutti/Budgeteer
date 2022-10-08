import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
} from "sequelize";
import sequelize from "@config/db.config";

class Income extends Model<
    InferAttributes<Income>,
    InferCreationAttributes<Income>
> {
    declare user: string;
    declare ammount: number;
    declare month: number;
    declare id?: number;
    declare year: number;
}

Income.init(
    {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ammount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: "Income",
    }
);

export default Income;
