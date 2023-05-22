import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/database';

class Currency extends Model<InferAttributes<Currency>, InferCreationAttributes<Currency>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare iso_code: string;
}

Currency.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    iso_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'currencies',
});

export { Currency };