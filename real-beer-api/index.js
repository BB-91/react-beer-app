import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/beerAPI.js";
import { sequelize } from "./db/index.js";

// http://localhost:3010/api/beers/

const app = express();
const port = process.env.PORT || 3010;

sequelize.sync()
.then(result => {
    console.log(`result: `, result);
})
.catch(err => {
    console.log(`err: `, err)
})

app.use(bodyParser.json());
app.use(cors({origin: "*"}))
app.use('/images', express.static('images'));
app.use("/api/beers", router);

app.listen(port, (req, res) => {
    console.log("Server is running on port " + port);
});


// Listen for requests on port and run this callback function

// app.get("/welcome", (req, res) => {
//     res.status(200).send({"message": "Hey APIS are awesome!"})
// });

// app.post("/api/beers", (req, res) => {
//     console.log(`POST req: `, req)
//     // res.status(200).send({"message": "Hey APIS are awesome!"})
// });


// app.post("/api/beers", (req, res) => {
//     console.log(`POST req: `, req)
//     // res.status(200).send({"message": "Hey APIS are awesome!"})
// });
   