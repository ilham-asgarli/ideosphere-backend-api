import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';

class Company extends Model {
    public id!: string;
    public user_id!: string;
    public name?: string;
    public description?: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Company.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'companies',
});

Company.belongsTo(User, {
    foreignKey: 'user_id',
});

export { Company };