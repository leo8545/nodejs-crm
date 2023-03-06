import { Op } from "sequelize"
import Permission from "../models/permission.js"
import RoleHasPermission from "../models/RoleHasPermission.js"
import UserRole from "../models/UserRole.js"

const RoleAndPermissionController = {
    createRole: async (req, res, next) => {
        try {
            const { name, title } = req.body 
            const role = await UserRole.create({
                name, title 
            })
            return res.status(200).json({
                status: 200,
                role: role
            })
        } catch(e) {
            next(e)
        }
    },
    createPermission: async (req, res, next) => {
        try {
            const { name } = req.body 
            const permission = await Permission.create({
                name
            })
            return res.status(200).json({
                status: 200,
                permission
            })
        } catch(e) {
            next(e)
        }
    },
    assignPermissionsToRole: async (req, res, next) => {
        try {
            const { user_role_id, permission_ids } = req.body
            const objects = permission_ids.map(pid => ({
                user_role_id,
                permission_id: pid 
            }))
            const result = await RoleHasPermission.bulkCreate(objects)
            return res.status(200).json({
                status: 200,
                data: result 
            })
        } catch(e) {
            next(e)
        }
    },
    getRolesWithPermissions: async (req, res, next) => {
        try {
            const data = await UserRole.findAll({
                include: [
                    {
                        model: Permission,
                        as: 'permissions',
                        // foreignKey: 'user_role_id'
                    }
                ]
            })
            return res.status(200).json({
                status: 200,
                data: data 
            })
        } catch(e) {
            next(e)
        }
    },
    updatePermissionsOfRole: async (req, res, next) => {
        try {
            const { user_role_id, permission_ids } = req.body 
            // get all permissions and delete which are not in permission_ids 
            const role_has_perms = await RoleHasPermission.findAll({
                where: {
                    user_role_id,
                }
            })
            const role_has_perm_ids = role_has_perms.map(item => item.permission_id)
            const perm_ids_to_delete = role_has_perm_ids.filter(id => !permission_ids.includes(id))
            if(perm_ids_to_delete.length > 0) {
                const del_perms_count = await RoleHasPermission.destroy({
                    where: {
                        user_role_id,
                        permission_id: {
                            [Op.in]: perm_ids_to_delete
                        }
                    }
                })
            }
            // add new permissions 
            const perm_ids_to_insert = permission_ids.filter(id => !role_has_perm_ids.includes(id) && !perm_ids_to_delete.includes(id))
            if(perm_ids_to_insert.length > 0) {
                const new_perms = await RoleHasPermission.bulkCreate(perm_ids_to_insert.map(id => ({
                    user_role_id,
                    permission_id: id
                })))
            }
            
            return res.status(200).json({
                status: 200,
                data: {
                    deletedPermissionsCount: perm_ids_to_delete.length,
                    newlyAssignedPermissionsCount: perm_ids_to_insert.length,
                }
            })
        } catch(e) {
            next(e)
        }
    },
    getRoleWithPermissions: async (req, res, next) => {
        try {
            const { user_role_id } = req.params 
            const role = await UserRole.findByPk(user_role_id, {
                include: [{ model: Permission, as: 'permissions' }]
            })
            return res.status(200).json({
                status: 200,
                role 
            })
        } catch(e) {
            next(e)
        }
    },
    getPermissionById: async (req, res, next) => {
        try {
            const { permission_id } = req.params 
            const perm = await Permission.findByPk(permission_id)
            return res.status(200).json({
                status: 200,
                permission: perm 
            })
        } catch(e) {
            next(e)
        }
    },
    getRoleById: async (req, res, next) => {
        try {
            const { user_role_id } = req.params 
            const role = await UserRole.findByPk(user_role_id)
            return res.status(200).json({
                status: 200,
                role 
            })
        } catch(e) {
            next(e)
        }
    },
    getRoles: async (req, res, next) => {
        try {
            const roles = await UserRole.findAll()
            return res.status(200).json({
                status: 200,
                data: roles 
            })
        } catch(e) {
            next(e)
        }
    },
    getPermissions: async (req, res, next) => {
        try {
            const perms = await Permission.findAll()
            return res.status(200).json({
                status: 200,
                data: perms
            })
        } catch(e) {
            next(e)
        }
    }
}

export default RoleAndPermissionController