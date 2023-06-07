import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { User } from './user.model';
import { ChatMessage } from './chat_messages.model';

class MessageReceivedUser extends Model<
  InferAttributes<MessageReceivedUser>,
  InferCreationAttributes<MessageReceivedUser>
> {
  declare id: CreationOptional<string>;
  declare message_id: ForeignKey<ChatMessage['id']>;
  declare user_id: ForeignKey<User['id']>;
}

MessageReceivedUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'message_received_users',
  },
);

MessageReceivedUser.belongsTo(ChatMessage, {
  foreignKey: {
    name: 'message_id',
    allowNull: false,
  },
});
ChatMessage.hasMany(MessageReceivedUser, {
  foreignKey: {
    name: 'message_id',
    allowNull: false,
  },
});

MessageReceivedUser.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});
User.hasMany(MessageReceivedUser, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

export { MessageReceivedUser };
