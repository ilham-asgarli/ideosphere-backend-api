import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config';

class UserType extends Model<InferAttributes<UserType>, InferCreationAttributes<UserType>> {
    declare id: CreationOptional<number>;
    declare name: string;

    declare created_at: Date;
    declare updated_at: Date;
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
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'user_types',
});

export { UserType };