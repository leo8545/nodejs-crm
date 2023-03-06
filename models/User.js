import { DATE, ENUM, Model, STRING } from "sequelize";
import { sequelize } from "../config/database.js";

class User extends Model {
    isActive() {
        return this.status === 'active'
    }
}

export const USER_STATUS = ['active', 'deleted', 'suspended']

User.init({
    name: {
        type: STRING,
    },
    email: {
        type: STRING,
        allowNull: false, 
    },
    password: {
        type: STRING 
    },
    status: {
        type: ENUM(USER_STATUS),
        defaultValue: 'active'
    },
    suspendedAt: {
        type: DATE,
    },
}, {
    sequelize: sequelize,
    tableName: 'users', 
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ],
    paranoid: true 
})

export default User