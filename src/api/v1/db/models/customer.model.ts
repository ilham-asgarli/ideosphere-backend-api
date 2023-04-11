import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { UserGender } from './user_gender.model';

class Customer extends Model {
    public id!: string;
    public user_id!: string;
    public gender_id!: number;
    public firstname!: string;
    public lastname!: string;
    public biography!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Customer.init({
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
    gender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserGender,
            key: 'id',
        },
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    biography: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'customers',
});

Customer.belongsTo(User, {
    foreignKey: 'user_id',
});

Customer.belongsTo(UserGender, {
    foreignKey: 'gender_id',
});

export { Customer };