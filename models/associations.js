import Permission from "./permission.js";
import RoleHasPermission from "./RoleHasPermission.js";
import User from "./User.js";
import UserRole from "./UserRole.js";

UserRole.belongsToMany(Permission, {
    through: RoleHasPermission,
    foreignKey: 'user_role_id',
    as: 'permissions'
})
Permission.belongsToMany(UserRole, {
    through: RoleHasPermission,
    foreignKey: 'permission_id',
    as: 'user_roles' 
})

UserRole.hasOne(User, {
    foreignKey: 'user_role_id',
    as: 'user'
})

User.belongsTo(UserRole, {
    foreignKey: 'user_role_id',
    as: 'user_role'
})

