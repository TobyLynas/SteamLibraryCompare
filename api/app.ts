import express from "express";
import cors from "cors";

const PORT = 9000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}...`);
});
