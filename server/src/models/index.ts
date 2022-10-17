import User from "@models/user";
import WeeklyCategory from "@models/weeklyCategory";

import Income from "@models/Income";
import FamilyUser from "@models/FamilyUser";
import WeeklyExpense from "./WeeklyExpense";
import { BelongsTo } from "sequelize";

// ** Categories & Users
User.belongsToMany(WeeklyCategory, {
    through: WeeklyExpense,
    foreignKey: "userId",
});
WeeklyCategory.belongsToMany(User, {
    through: WeeklyExpense,
    foreignKey: "weeklyCategoryId",
});

// // ** Family user & User
// User.hasMany(FamilyUser, {
//     foreignKey: "userId",
// });
// FamilyUser.belongsTo(User, { foreignKey: "userId" });

// // ** Income & User || FamilyUser
// User.hasOne(Income, {
//     foreignKey: "userId",
// });
// FamilyUser.hasOne(Income, { foreignKey: "familyId" });

// // ** Weekly Expense & User || FamilyUser ** //
// User.hasMany(WeeklyExpense, { foreignKey: "userId" });
// FamilyUser.hasMany(WeeklyExpense, { foreignKey: "familyId" });

// // ** Expense & Category ** //
// WeeklyCategory.hasMany(WeeklyExpense, { foreignKey: "categoryId" });

export default {
    WeeklyCategory,
    User,

    WeeklyExpense,
};
