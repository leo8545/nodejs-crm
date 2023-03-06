import { INTEGER, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class RoleHasPermission extends Model {}

RoleHasPermission.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize: sequelize,
    tableName: 'role_has_permissions', 
})

export default RoleHasPermission