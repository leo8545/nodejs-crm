import { DATE, ENUM, Model, STRING } from "sequelize";
import { sequelize } from "../config/database.js";

class UserRole extends Model {}

UserRole.init({
    name: {
        type: STRING,
        allowNull: false 
    },
    title: {
        type: STRING,
        allowNull: false 
    }
}, {
    sequelize: sequelize,
    tableName: 'user_roles', 
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ],
})

export default UserRole