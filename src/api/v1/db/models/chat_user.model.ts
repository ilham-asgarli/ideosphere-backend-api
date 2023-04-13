import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { Chat } from './chat.model';

class ChatUser extends Model<InferAttributes<ChatUser>, InferCreationAttributes<ChatUser>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare chat_id: ForeignKey<Chat['id']>;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

ChatUser.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'chat_users',
});

ChatUser.belongsTo(User);
User.hasMany(ChatUser, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

ChatUser.belongsTo(Chat, {
    foreignKey: 'chat_id',
});
Chat.hasMany(ChatUser, {
    foreignKey: {
        name: 'chat_id',
        allowNull: false,
    }
});

export { ChatUser };