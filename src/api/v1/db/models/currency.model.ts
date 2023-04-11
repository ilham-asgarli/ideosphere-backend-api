import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';

class Currency extends Model {
    public id!: string;
    public user_id!: string;
    public name!: string;
    public description!: string;

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
    },
    iso_code: DataTypes.STRING,
}, {
    sequelize,
    tableName: 'currencies',
});

export { Currency };