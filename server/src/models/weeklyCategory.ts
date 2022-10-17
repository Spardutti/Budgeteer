import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    ForeignKey,
} from "sequelize";
import sequelize from "@config/db.config";

class WeeklyCategory extends Model<
    InferAttributes<WeeklyCategory>,
    InferCreationAttributes<WeeklyCategory>
> {
    declare name: string;
    declare ammount: number;
    declare week: number;
    declare month: number;
    declare year: number;
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<number>;
}

WeeklyCategory.init(
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
        tableName: "Weekly Category",
    }
);

export default WeeklyCategory;
