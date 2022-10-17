import sequelize from "@config/db.config";
import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

class FamiliyUser extends Model<
    InferAttributes<FamiliyUser>,
    InferCreationAttributes<FamiliyUser>
> {
    declare userId: ForeignKey<number>;
    declare id: CreationOptional<number>;
    declare name: string;
}

FamiliyUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Family User",
    }
);

export default FamiliyUser;
