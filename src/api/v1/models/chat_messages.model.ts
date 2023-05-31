import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { ChatUser } from './chat_user.model';
import { sequelize } from '../config/sequelize.config';

class ChatMessage extends Model<InferAttributes<ChatMessage>, InferCreationAttributes<ChatMessage>> {
  declare id: CreationOptional<string>;
  declare chat_user_id: ForeignKey<ChatUser['id']>;
  declare message: string;
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
}, {
  sequelize,
  tableName: 'chat_messages',
});

ChatMessage.belongsTo(ChatUser, {
  foreignKey: {
    name: 'chat_user_id',
    allowNull: false,
  }
});
ChatUser.hasMany(ChatMessage, {
  foreignKey: {
    name: 'chat_user_id',
    allowNull: false,
  }
});

export { ChatMessage };