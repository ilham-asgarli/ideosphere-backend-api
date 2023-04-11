import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';

class UserType extends Model {
    public id!: number;
    public name!: string;
    
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

UserType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'user_types',
});

export { UserType };