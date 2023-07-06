const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 8080;
const app = express();

const pool = new Pool({
    user: "phitran",
    host: "localhost",
    database: "phitran",
    port: "5432"
})

app.get("/api", (req, res) => {
    res.json({ message: "server" })
})

app.get("/api/db", (req, res) => {
    pool.query("SELECT * FROM car_inventory", (error, result) => {
        if (error) {
            console.error("error executing the query", error)
            res.status(500).json({ error: "Internal Server Error" })
            return
        }
        res.json(result.rows)
    })
})

app.listen(PORT, () => {
    console.log("Server listening on", PORT)
})