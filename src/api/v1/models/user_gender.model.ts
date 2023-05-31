import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/sequelize.config';

class UserGender extends Model<InferAttributes<UserGender>, InferCreationAttributes<UserGender>> {
    declare id: CreationOptional<number>;
    declare name: string;
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
        unique: true,
    },
}, {
    sequelize,
    tableName: 'user_genders',
});

export { UserGender };