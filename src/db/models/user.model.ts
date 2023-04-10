import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class User extends Model {
  public id!: string;
  public user_type_id!: number;
  public email!: string;
  public password!: string;
  public phone_number!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.STRING(128),
    primaryKey: true,
  },
  user_type_id: DataTypes.INTEGER,
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  phone_number: DataTypes.STRING(128),
}, {
  tableName: 'users',
  sequelize,
});

export { User };