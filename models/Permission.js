import { DATE, ENUM, Model, STRING } from "sequelize";
import { sequelize } from "../config/database.js";

class Permission extends Model {}

Permission.init({
    name: {
        type: STRING,
        allowNull: false 
    },
}, {
    sequelize: sequelize,
    tableName: 'permissions', 
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ],
})

export default Permission