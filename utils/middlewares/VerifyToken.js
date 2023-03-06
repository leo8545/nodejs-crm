import jwt from "jsonwebtoken"
import User from "../../models/User.js"
export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            return res.status(403).json({
                status: 403,
                errorType: "Unauthorized",
                error: "token is required",
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.userId)
        if(!user) {
            return res.status(403).json({
                status: 403,
                errorType: "Unauthorized",
                error: "User not found",
            })
        }
        if(!user.isActive()) {
            return res.status(403).json({
                status: 403,
                errorType: "Unauthorized",
                error: "This user is suspended!",
            })
        }
        req.token = token
        req.user = decoded 
        next()
    } catch(e) {
        if(e instanceof jwt.TokenExpiredError) {
            return res.status(403).json({
                status: 403,
                errorType: "TokenExpiredError",
                error: "Unauthorized. Token expired. Please login again!"
            })
        }
        next(e)
    }
}