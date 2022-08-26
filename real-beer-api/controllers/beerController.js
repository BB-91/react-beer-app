// import Heineken from "../images/Heineken.png";
// import Heineken from "../images/Heineken.png";
// import Heineken from "../images/";

const imgFolder = "http://localhost:3010/images/"

const customBeers = [
    {
        id: 26,
        name: "Beer A",
        tagline: "Beer A tagline",
        first_brewed: "09/2006",
        description: "Beer A description.",
        image_url: `${imgFolder}Heineken.png`,
        abv: 4.6,
        ph: 4.6,
        food_pairing: [
            "Pizza",
            "Chips",
            "Hamburgers"
        ],
    },
    {
        id: 27,
        name: "Beer B",
        tagline: "Beer B tagline",
        first_brewed: "09/2007",
        description: "Beer B description.",
        image_url: `${imgFolder}BudLight.png`,
        abv: 4.7,
        ph: 4.7,
        food_pairing: [
            "Pizza",
            "Chips",
            "Hamburgers"
        ],
    },
];


export const getBeers = (req, res) => {
    res.status(200).send({ customBeers })
}

export const getBeerById = (req, res) => {
    const { id } = req.params;
    res.status(200).send({
        beer: customBeers[id] || "No Beer found"
    })
}

export const addBeer = (req, res) => {
    const { beer } = req.body;
    // const beer = req.body;
    console.log(`beer from addBeer: `, beer)
    customBeers.push(beer);
    res.status(201).send({
        message: "Beer added"
    })
}

// export const deleteBeerById = (req, res) => {
//     const {id} = req.params
//     beerNames.splice(id, 1)
//     res.status(200).send({
//         message: "Beer Deleted"
//     })
// }