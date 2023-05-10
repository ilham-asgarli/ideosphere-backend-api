import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { ChatUser } from './chat_user.model';

class ChatMessage extends Model<InferAttributes<ChatMessage>, InferCreationAttributes<ChatMessage>> {
  declare id: CreationOptional<string>;
  declare chat_user_id: ForeignKey<ChatUser['id']>;
  declare message: string;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

ChatMessage.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'chat_messages',
});

ChatMessage.belongsTo(ChatUser);
ChatUser.hasMany(ChatMessage, {
  foreignKey: {
    name: 'chat_user_id',
    allowNull: false,
  }
});

export { ChatMessage };