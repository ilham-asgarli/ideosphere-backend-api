import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { UserType } from './user_type.model';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare user_type_id: ForeignKey<UserType['id']>;
  declare email: string;
  declare password: string;
  declare phone_number: string | null;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    validate: {
      len: [1, 25],
    },
  },
}, {
  sequelize,
  tableName: 'users',
});

User.belongsTo(UserType, {
  foreignKey: {
    name: 'user_type_id',
    allowNull: false,
  }
});
UserType.hasMany(User, {
  foreignKey: {
    name: 'user_type_id',
    allowNull: false,
  }
});

export { User };