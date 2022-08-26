import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/beerAPI.js";
import { sequelize } from "./db/index.js";

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
   