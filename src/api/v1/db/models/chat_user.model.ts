import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { Chat } from './chat.model';

class ChatUser extends Model {
    public id!: string;
    public user_id!: string;
    public chat_id!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

ChatUser.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    chat_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Chat,
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'chat_users',
});

ChatUser.belongsTo(User, {
    foreignKey: 'user_id',
});

ChatUser.belongsTo(Chat, {
    foreignKey: 'chat_id',
});

export { ChatUser };