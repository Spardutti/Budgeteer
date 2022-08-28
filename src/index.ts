import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Express + Ts Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at this port  ${port}`);
});
