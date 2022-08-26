import {Sequelize} from "sequelize";
import { sequelize } from "../db/index.js";


export const Beer = sequelize.define("beers", {
    id: {
        type: Sequelize.INTEGER,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    tagline: {
        type: Sequelize.STRING,
    },
    first_brewed: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    image_url: {
        type: Sequelize.STRING,
    },
    abv: {
        type: Sequelize.INTEGER,
    },
    ph: {
        type: Sequelize.INTEGER,
    },
    food_pairing: {
        type: Sequelize.STRING, // x&&y&&z
    }, 
})