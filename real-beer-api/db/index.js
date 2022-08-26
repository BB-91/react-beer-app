import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("real_beer_api", "root", "password", {
    dialect: "mysql",
    host: "localhost",
});