import express from "express";
import cors from "cors";

if (!process.env.PORT) {
    console.error("err: missing port!");
    process.exit(1);
}

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on localhost:${process.env.PORT}...`);
});
