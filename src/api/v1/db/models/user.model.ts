import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { UserType } from './user_type.model';

class User extends Model {
  public id!: string;
  public user_type_id!: number;
  public email!: string;
  public password!: string;
  public phone_number?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserType,
      key: 'id',
    },
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
      len: [10, 15],
    },
  },
}, {
  sequelize,
  tableName: 'users',
});

User.belongsTo(UserType, {
  foreignKey: 'user_type_id',
});

export { User };