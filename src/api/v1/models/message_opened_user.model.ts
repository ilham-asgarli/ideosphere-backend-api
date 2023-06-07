import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { User } from './user.model';
import { ChatMessage } from './chat_messages.model';

class MessageOpenedUser extends Model<InferAttributes<MessageOpenedUser>, InferCreationAttributes<MessageOpenedUser>> {
  declare id: CreationOptional<string>;
  declare message_id: ForeignKey<ChatMessage['id']>;
  declare user_id: ForeignKey<User['id']>;
}

MessageOpenedUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'message_opened_users',
  },
);

MessageOpenedUser.belongsTo(ChatMessage, {
  foreignKey: {
    name: 'message_id',
    allowNull: false,
  },
});
ChatMessage.hasMany(MessageOpenedUser, {
  foreignKey: {
    name: 'message_id',
    allowNull: false,
  },
});

MessageOpenedUser.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});
User.hasMany(MessageOpenedUser, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

export { MessageOpenedUser };
