import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';

class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare name: string | null;
    declare description: string | null;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

Company.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'companies',
});

Company.belongsTo(User);
User.hasOne(Company, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

export { Company };