import WeeklyExpense from "@models/WeeklyExpense";
import WeeklyCategory from "@models/weeklyCategory";
import { UserInterface } from "@interface/interfaces";
import { Optional } from "sequelize";
import {
    Column,
    HasMany,
    Table,
    Model,
    BelongsToMany,
} from "sequelize-typescript";
import Income from "./Income";

interface UserCreationAttributes extends Optional<UserInterface, "id"> {}
@Table
class User extends Model<UserInterface, UserCreationAttributes> {
    @Column
    name!: string;

    @HasMany(() => Income)
    income!: Income[];

    @HasMany(() => WeeklyCategory)
    weeklyCategory!: WeeklyCategory[];

    @BelongsToMany(() => WeeklyCategory, () => WeeklyExpense)
    expense!: WeeklyExpense[];
}

export default User;
