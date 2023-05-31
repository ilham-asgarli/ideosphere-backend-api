import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { User } from './user.model';
import { Chat } from './chat.model';

class ChatUser extends Model<InferAttributes<ChatUser>, InferCreationAttributes<ChatUser>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare chat_id: ForeignKey<Chat['id']>;
}

ChatUser.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
}, {
    sequelize,
    tableName: 'chat_users',
});

ChatUser.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});
User.hasMany(ChatUser, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

ChatUser.belongsTo(Chat, {
    foreignKey: {
        name: 'chat_id',
        allowNull: false,
    }
});
Chat.hasMany(ChatUser, {
    foreignKey: {
        name: 'chat_id',
        allowNull: false,
    }
});

export { ChatUser };