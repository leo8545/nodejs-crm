import AppError from "./AppError.js";

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400, "ValidationError");
        // this.statusCode = 400
        // this.errorType = "ValidationError"
    }
}

export default ValidationError