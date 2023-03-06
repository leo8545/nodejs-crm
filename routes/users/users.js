import express from "express"
import UserController from "../../controllers/UserController.js"
import UserValidation from "../../validations/user.js"

const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/:id', UserValidation.getOneById, UserController.getOneById)
router.post('/', UserValidation.createUser, UserController.createUser)
router.put('/:id', UserValidation.updateOneById, UserController.updateOne)
router.delete('/:id', UserValidation.existWithId, UserController.deleteOneById)

export const UserRouter = router