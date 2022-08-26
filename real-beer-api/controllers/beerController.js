// import Heineken from "../images/Heineken.png";
// import Heineken from "../images/Heineken.png";
// import Heineken from "../images/";

import { Beer } from "../models/beersModel.js";

const imgFolder = "http://localhost:3010/images/"

// const customBeers = [
//     {
//         id: 26,
//         name: "Beer A",
//         tagline: "Beer A tagline",
//         first_brewed: "09/2006",
//         description: "Beer A description.",
//         image_url: `${imgFolder}Heineken.png`,
//         abv: 4.6,
//         ph: 4.6,
//         food_pairing: [
//             "Pizza",
//             "Chips",
//             "Hamburgers"
//         ],
//     },
//     {
//         id: 27,
//         name: "Beer B",
//         tagline: "Beer B tagline",
//         first_brewed: "09/2007",
//         description: "Beer B description.",
//         image_url: `${imgFolder}BudLight.png`,
//         abv: 4.7,
//         ph: 4.7,
//         food_pairing: [
//             "Pizza",
//             "Chips",
//             "Hamburgers"
//         ],
//     },
// ];


// export const getBeers = (req, res) => {
//     res.status(200).send({ customBeers })
// }

export const getBeers = (req, res) => {
    Beer.findAll()
        .then(beers => {
            res.status(200).send(beers)
        })
        .catch(err => {
            console.log(err)
        })
};


// export const Beer = sequelize.define("beers", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//     },
//     tagline: {
//         type: Sequelize.STRING,
//     },
//     first_brewed: {
//         type: Sequelize.STRING,
//     },
//     description: {
//         type: Sequelize.STRING,
//     },
//     image_url: {
//         type: Sequelize.STRING,
//     },
//     abv: {
//         type: Sequelize.INTEGER,
//     },
//     ph: {
//         type: Sequelize.INTEGER,
//     },
//     food_pairing: {
//         type: Sequelize.STRING, // x&&y&&z
//     }, 
// })

export const addBeer = (req, res) => {
    const { id, name, tagline, first_brewed, description, image_url, abv, ph, food_pairing } = req.body;

    Beer.create({
        id,
        name,
        tagline,
        first_brewed,
        description,
        image_url,
        abv,
        ph,
        food_pairing,
    })
        .then(() => {
            res.status(201).send({ message: "Created" })
        })
        .catch(err => {
            console.log(err)
        })
};


// export const getBeerById = (req, res) => {
//     const { id } = req.params;
//     res.status(200).send({
//         beer: customBeers[id] || "No Beer found"
//     })
// }

// export const addBeer = (req, res) => {
//     const { beer } = req.body;
//     // const beer = req.body;
//     console.log(`beer from addBeer: `, beer)
//     customBeers.push(beer);
//     res.status(201).send({
//         message: "Beer added"
//     })
// }

// export const deleteBeerById = (req, res) => {
//     const {id} = req.params
//     beerNames.splice(id, 1)
//     res.status(200).send({
//         message: "Beer Deleted"
//     })
// }