import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';
import { UserGender } from './user_gender.model';

class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare gender_id: ForeignKey<UserGender['id']>;
    declare firstname: string | null;
    declare lastname: string | null;
    declare biography: string | null;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

Customer.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    biography: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 300]
        }
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'customers',
});

Customer.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasOne(Customer, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

Customer.belongsTo(UserGender);
UserGender.hasOne(Customer, {
    foreignKey: {
        name: 'gender_id',
        allowNull: false,
    }
});

export { Customer };