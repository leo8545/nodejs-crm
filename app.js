import dotenv from "dotenv"
dotenv.config() 
import express from "express"
import { connectToDatabase } from "./config/database.js"
import { routes } from "./routes/index.js"
import "./models/associations.js"

const app = express() 
app.use(express.json())
connectToDatabase()

routes(app)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`--- Server started at: http://localhost:${process.env.SERVER_PORT} ---`)
})