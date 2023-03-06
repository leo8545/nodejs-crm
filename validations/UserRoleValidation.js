import { body, param } from "express-validator"
import { Op } from "sequelize"
import Permission from "../models/permission.js"
import RoleHasPermission from "../models/RoleHasPermission.js"
import UserRole from "../models/UserRole.js"
import ValidationHandler from "./validation_handler.js"

const UserRoleValidation = {
    createRole: [
        body('name')
            .exists().withMessage('name is required').bail()
            .custom(value => {
                return UserRole.findOne({ where: { name: value } }).then(res => {
                    if(res) {
                        return Promise.reject('Role with that name already exists')
                    }
                })
            }),
        body('title')
            .exists().withMessage('title is required').bail(),
        ValidationHandler
    ],
    createPermission: [
        body('name')
            .exists().withMessage('name is required').bail()
            .custom(value => {
                return Permission.findOne({ where: { name: value } }).then(res => {
                    if(res) {
                        return Promise.reject('Permission with that name already exists')
                    }
                })
            }),
        ValidationHandler
    ],
    assignPermissionsToRole: [
        body('user_role_id')
            .exists().withMessage('user_role_id is requird').bail()
            .isInt().withMessage('user_role_id should be an integer').bail()
            .custom(value => {
                return UserRole.findByPk(value).then(res => {
                    if(!res) {
                        return Promise.reject('User role with that id not found')
                    }
                })
            }),
        body('permission_ids')
            .exists().withMessage('permission_ids is required').bail()
            .isArray().withMessage('permission_ids should be an array').bail()
            .custom(value => {
                value = Array.from(new Set(value))
                if(value.length === 0) {
                    return Promise.reject('permission_ids cannot be empty')
                }
                return Permission.findAll({
                    where: {
                        id: {
                            [Op.in]: value
                        }
                    }
                }).then(res => {
                    if(res.length !== value.length) {
                        const foundIds = res.map(item => item.id)
                        const ids = value.filter(id => !foundIds.includes(id))
                        return Promise.reject('Permissions with that ids not found: ' + ids.join(","))
                    } 
                })
            }),
        body()
            .custom(body => {
                const { user_role_id, permission_ids } = body 
                return RoleHasPermission.findAll({
                    where: {
                        user_role_id,
                        permission_id: {
                            [Op.in]: permission_ids
                        }
                    }
                }).then(rows => {
                    if(rows.length > 0) {
                        return Promise.reject('This user role has already some of the assigned permissions')
                    }
                })
            }),
        ValidationHandler
    ],
    updatePermissionsOfRole: [
        body('user_role_id')
            .exists().withMessage('user_role_id is requird').bail()
            .isInt().withMessage('user_role_id should be an integer').bail()
            .custom(value => {
                return UserRole.findByPk(value).then(res => {
                    if(!res) {
                        return Promise.reject('User role with that id not found')
                    }
                })
            }),
        body('permission_ids')
            .exists().withMessage('permission_ids is required').bail()
            .isArray().withMessage('permission_ids should be an array').bail()
            .custom(value => {
                value = Array.from(new Set(value))
                if(value.length === 0) {
                    return Promise.reject('permission_ids cannot be empty')
                }
                return Permission.findAll({
                    where: {
                        id: {
                            [Op.in]: value
                        }
                    }
                }).then(res => {
                    if(res.length !== value.length) {
                        const foundIds = res.map(item => item.id)
                        const ids = value.filter(id => !foundIds.includes(id))
                        return Promise.reject('Permissions with that ids not found: ' + ids.join(","))
                    } 
                })
            }),
        ValidationHandler
    ],
    getRoleById: [
        param('user_role_id')
            .exists().withMessage('user_role_id is requird').bail()
            .isInt().withMessage('user_role_id should be an integer').bail()
            .custom(value => {
                return UserRole.findByPk(value).then(res => {
                    if(!res) {
                        return Promise.reject('User role with that id not found')
                    }
                })
            }),
        ValidationHandler
    ],
    getPermissionById: [
        param('permission_id')
            .exists().withMessage('permission_id is requird').bail()
            .isInt().withMessage('permission_id should be an integer').bail()
            .custom(value => {
                return Permission.findByPk(value).then(res => {
                    if(!res) {
                        return Promise.reject('Permission with that id not found')
                    }
                })
            }),
        ValidationHandler
    ]
}

export default UserRoleValidation