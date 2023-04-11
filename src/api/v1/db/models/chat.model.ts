import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class Chat extends Model {
  public id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Chat.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'chats',
});

export { Chat };