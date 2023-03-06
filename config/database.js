import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env

export const sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false
})

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true })
        console.log('Database connected!')
    } catch(e) {
        console.log(`Error connecting database: `, e)
    }
}