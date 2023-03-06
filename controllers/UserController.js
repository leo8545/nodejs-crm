import User from "../models/User.js"
import bcrypt from "bcrypt"

const UserController = {
    getOneById: async (req, res, next) => {
        try {
            const { id } = req.params 
            const user = await User.findByPk(id)
            const statusCode = user !== null ? 200 : 404 
            return res.status(statusCode).json({
                status: statusCode,
                user
            })
        } catch(e) {
            next(e)
        }
    },
    getUsers: async (req, res, next) => {
        try {
            const users = await User.findAndCountAll()
            return res.status(200).json({
                status: 200,
                users
            })
        } catch(e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { email, name, password } = req.body 
            const pwHash = await bcrypt.hash(password, 5)
            const user = await User.create({
                email,
                name, 
                password: pwHash,
                user_role_id: 2 // user
            })
            return res.status(200).json({
                status: 200,
                user: user,
            })
        } catch(e) {
            next(e)
        }
    },
    updateOne: async (req, res, next) => {
        try {
            const { id } = req.params 
            const { name, status } = req.body 
            
            const update = await User.update({
                name,
                status,
                suspendedAt: status === 'suspended' ? Date.now() : null
            }, {
                where: {
                    id: id 
                },
            })
            const user = await User.findByPk(id)
            const statusCode = update[0] === 1 ? 200 : 400
            return res.status(statusCode).json({
                status: statusCode,
                isUpdated: statusCode == 200,
                user,
            })
        } catch(e) {
            next(e)
        }
    },
    deleteOneById: async (req, res, next) => {
        try {
            const { id } = req.params
            const rows = await User.destroy({
                where: { id }
            })
            const statusCode = rows === 1 ? 200 : 400
            return res.status(statusCode).json({
                status: statusCode,
                isDeleted: statusCode === 200 
            })
        } catch(e) {
            next(e)
        }
    }
}

export default UserController