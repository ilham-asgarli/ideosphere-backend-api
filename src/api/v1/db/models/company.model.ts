import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class Company extends Model {
    public id!: string;
    public user_id!: string;
    public name!: string;
    public description!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Company.init({
    id: {
        type: DataTypes.STRING(128),
        primaryKey: true,
    },
    user_id: DataTypes.STRING(128),
    name: DataTypes.STRING(128),
    description: DataTypes.STRING(128),
}, {
    sequelize,
    tableName: 'companies',
});

export { Company };