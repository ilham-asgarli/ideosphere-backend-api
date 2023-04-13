import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config';

class UserGender extends Model<InferAttributes<UserGender>, InferCreationAttributes<UserGender>> {
    declare id: CreationOptional<number>;
    declare name: string;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

UserGender.init({
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
    tableName: 'user_genders',
});

export { UserGender };