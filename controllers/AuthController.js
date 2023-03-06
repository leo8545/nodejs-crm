import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import UserRole from "../models/UserRole.js"

const AuthController = {
    login: async (req, res, next) => { 
        try {
            const {email, password} = req.body 
            const user = await User.findOne({
                where: {
                    email: email 
                },
                include: ["user_role"]
            })
            
            const didPasswordMatch = await bcrypt.compare(password, user.password)
            let token 
            if(didPasswordMatch) {
                token = jwt.sign({
                    userId: user.id,
                    email: user.email,
                    role: user.user_role.name
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })
            }
            let statusCode = didPasswordMatch ? 200 : 400 
            return res.status(statusCode).json({
                status: statusCode,
                isLoggedIn: statusCode == 200,
                user: didPasswordMatch ? user : undefined,
                token
            })
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
}

export default AuthController