import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const sequelize = new Sequelize(process.env.DB_URL as string);

export default sequelize;
