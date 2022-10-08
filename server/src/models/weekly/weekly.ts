import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
} from "sequelize";
import sequelize from "@config/db.config";

class Weekly extends Model<
    InferAttributes<Weekly>,
    InferCreationAttributes<Weekly>
> {
    declare name: string;
    declare ammount: number;
    declare week: number;
    declare month: number;
    declare id?: number;
    declare year: number;
}

Weekly.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ammount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        week: {
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
        tableName: "Weekly",
    }
);

export default Weekly;
