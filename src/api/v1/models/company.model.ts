import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { User } from './user.model';

class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare name: string | null;
    declare description: string | null;
}

Company.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 1000]
        }
    },
}, {
    sequelize,
    tableName: 'companies',
});

Company.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});
User.hasOne(Company, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

export { Company };