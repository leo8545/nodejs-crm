import { body } from "express-validator";
import User from "../models/User.js";
import ValidationHandler from "./validation_handler.js";

const AuthValidation = {
    login: [
        body('email')
            .exists().withMessage('email is required').bail()
            .isEmail().withMessage('Invalid email').bail()
            .custom(value => {
                return User.findOne({where: {email: value}}).then(res => {
                    if(!res) {
                        return Promise.reject('User with that email not found')
                    }
                })
            }),
        body('password')
            .exists().withMessage('password is required').bail(),
        ValidationHandler
    ]
}

export default AuthValidation