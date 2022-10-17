import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
} from "sequelize";
import sequelize from "@config/db.config";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare name: string;
    declare id: CreationOptional<number>;
}

User.init(
    {
        name: {
            type: DataTypes.STRING,
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
        tableName: "User",
    }
);

export default User;
