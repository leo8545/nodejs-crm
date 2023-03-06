import express from "express"
import RoleAndPermissionController from "../../controllers/RoleAndPermissionController.js"
import UserRoleValidation from "../../validations/UserRoleValidation.js"

const router = express.Router()

router.post('/create-role', UserRoleValidation.createRole, RoleAndPermissionController.createRole)
router.post('/create-permission', UserRoleValidation.createPermission, RoleAndPermissionController.createPermission)
router.post('/assign-permissions-to-role', UserRoleValidation.assignPermissionsToRole, RoleAndPermissionController.assignPermissionsToRole)
router.put('/update-permissions-of-role', UserRoleValidation.updatePermissionsOfRole, RoleAndPermissionController.updatePermissionsOfRole)

router.get('/roles', RoleAndPermissionController.getRoles)
router.get('/permissions', RoleAndPermissionController.getPermissions)
router.get('/roles-with-permissions', RoleAndPermissionController.getRolesWithPermissions)
router.get('/permission/:permission_id', UserRoleValidation.getPermissionById, RoleAndPermissionController.getPermissionById)
router.get('/role/:user_role_id', UserRoleValidation.getRoleById, RoleAndPermissionController.getRoleById)
router.get('/role-with-permissions/:user_role_id', UserRoleValidation.getRoleById, RoleAndPermissionController.getRoleWithPermissions)

export const UserRoleRouter = router