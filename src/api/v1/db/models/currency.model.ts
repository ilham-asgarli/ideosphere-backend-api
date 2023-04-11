import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class Currency extends Model {
    public id!: number;
    public name!: string;
    public iso_code!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Currency.init({
    id: {
        type: DataTypes.INTEGER,
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
}, {
    sequelize,
    tableName: 'currencies',
});

export { Currency };