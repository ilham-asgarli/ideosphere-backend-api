import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { User } from './user.model';
import { UserGender } from './user_gender.model';

class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare gender_id: ForeignKey<UserGender['id']>;
    declare firstname: string | null;
    declare lastname: string | null;
    declare biography: string | null;
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
}, {
    sequelize,
    tableName: 'customers',
});

Customer.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});
User.hasOne(Customer, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

Customer.belongsTo(UserGender, {
    foreignKey: {
        name: 'gender_id',
        allowNull: false,
    }
});
UserGender.hasOne(Customer, {
    foreignKey: {
        name: 'gender_id',
        allowNull: false,
    }
});

export { Customer };