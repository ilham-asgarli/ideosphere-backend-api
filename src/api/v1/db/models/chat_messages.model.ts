import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { Chat } from './chat.model';

class ChatMessage extends Model<InferAttributes<ChatMessage>, InferCreationAttributes<ChatMessage>> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<User['id']>;
  declare chat_id: ForeignKey<Chat['id']>;
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

ChatMessage.belongsTo(User);
User.hasMany(ChatMessage, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  }
});

ChatMessage.belongsTo(Chat);
Chat.hasMany(ChatMessage, {
  foreignKey: {
    name: 'chat_id',
    allowNull: false,
  },
});

export { ChatMessage };