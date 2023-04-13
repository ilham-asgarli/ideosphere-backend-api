import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config';

class Currency extends Model<InferAttributes<Currency>, InferCreationAttributes<Currency>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare iso_code: string;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
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
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'currencies',
});

export { Currency };