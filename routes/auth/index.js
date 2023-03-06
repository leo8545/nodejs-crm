import express from "express"
import AuthController from "../../controllers/AuthController.js"
import { isDevEnv } from "../../utils/helpers/functions.js"
import { isAdmin } from "../../utils/middlewares/isAdmin.js"
import AuthValidation from "../../validations/auth.js"

const router = express.Router()

router.post('/login', AuthValidation.login, AuthController.login)

if(isDevEnv()) {
    router.get('/test', isAdmin, async (req, res, next) => {
        return res.status(200).json({
            user: req.user,
            env: process.env.NODE_ENV
        })
    })
}

export const AuthRouter = router 