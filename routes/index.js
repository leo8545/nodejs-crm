import AppError from "../utils/errors/AppError.js"
import { AuthRouter } from "./auth/index.js"
import { UserRoleRouter } from "./users/roles.js"
import { UserRouter } from "./users/users.js"


export const routes = function(app) {
    const { API_PREFIX } = process.env 

    app.get('/', (req, res, next) => {
        res.json({
            message: 'Welcome to silence'
        })
    })

    app.use(`${API_PREFIX}/users`, UserRouter)
    app.use(`${API_PREFIX}/user-roles`, UserRoleRouter)
    app.use(`${API_PREFIX}/auth`, AuthRouter)

    app.use((err, req, res, next) => {
        if(err instanceof AppError) {
            res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message ?? "Something went wrong",
                errorType: err.errorType
            })
        } else {
            res.status(500).json({
                message: "Something went wrong",
                isOperationalError: true,
                error: err 
            })
        }
    })

    app.all('*', (req, res, next) => {
        res.status(404).json({
            message: `Route not found ${req.method}: ${req.originalUrl}`,
        })
    })
}