import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/sequelize.config';

class UserType extends Model<InferAttributes<UserType>, InferCreationAttributes<UserType>> {
    declare id: CreationOptional<number>;
    declare name: string;
}

UserType.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'user_types',
});

export { UserType };