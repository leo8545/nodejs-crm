import { body, param, validationResult } from "express-validator";
import User, { USER_STATUS } from "../models/User.js";
import ValidationHandler from "./validation_handler.js";

const UserValidation = {
    createUser: [
        body('email')
        .exists().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email').bail()
        .custom(value => {
            return User.findOne({ where: { email: value } }).then(res => {
                if(res) {
                    return Promise.reject('User with that email already exists!')
                }
            })
        }),
        body('password')
        .exists().withMessage('Password is required').bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1,
        }).withMessage('Password should be minimum 8 characters long and should contain atleast 1 lowercase, 1 uppercase, 1 number, 1 symbol'),
        ValidationHandler
    ],
    getOneById: [
        param('id')
            .exists().withMessage('id is required').bail()
            .isInt().withMessage('id should be an integer'),
        ValidationHandler,
    ],
    updateOneById: [
        param('id')
            .exists().withMessage('id is required').bail()
            .isInt().withMessage('id should be an integer').bail()
            .custom(value => {
                return User.findByPk(value).then(res => {
                    if(!res) {
                        return Promise.reject('User with that id not found')
                    }
                })
            }),
        body('status')
            .optional()
            .isIn(USER_STATUS).withMessage('Invalid status'),
        ValidationHandler,
    ],
    existWithId: [
        param('id')
            .exists().withMessage('id is required').bail()
            .isInt().withMessage('id should be an integer').bail()
            .custom(value => {
                return User.findByPk(value).then(res => {
                    if(!res) {
                        return Promise.reject('User with that id not found')
                    }
                })
            }),
        ValidationHandler
    ]
}

export default UserValidation 