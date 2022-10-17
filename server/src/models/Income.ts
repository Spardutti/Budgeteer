import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    ForeignKey,
} from "sequelize";
import sequelize from "@config/db.config";

class Income extends Model<
    InferAttributes<Income>,
    InferCreationAttributes<Income>
> {
    declare id: CreationOptional<number>;
    declare userId: CreationOptional<ForeignKey<number>>;
    declare familyId: CreationOptional<ForeignKey<number>>;
    declare amount: number;
    declare month: number;
    declare year: number;
}

Income.init(
    {
        amount: {
            type: DataTypes.INTEGER,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Income",
    }
);

export default Income;
