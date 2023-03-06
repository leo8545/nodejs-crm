import { validationResult } from "express-validator"

const ValidationHandler = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const arr = errors.array()
        let errs = {}
        arr.forEach(item => {
            if(!errs[item.param]) {
                errs[item.param] = [item.msg]
            } else {
                errs[item.param].push(item.msg)
            }
        })
        return res.status(400).json({
            status: 400,
            errorType: 'ValidationError',
            errors: errs,
        })
    }
    next()
}
export default ValidationHandler