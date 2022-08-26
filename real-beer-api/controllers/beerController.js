import { Beer } from "../models/beersModel.js";

const imgFolder = "http://localhost:3010/images/"

export const getBeers = (req, res) => {
    Beer.findAll()
        .then(beers => {
            res.status(200).send(beers)
        })
        .catch(err => {
            console.log(err)
        })
};

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