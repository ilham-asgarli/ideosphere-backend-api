import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { Chat } from './chat.model';

class ChatMessage extends Model {
    public id!: string;
    public user_id!: string;
    public chat_id!: string;
    public message!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

ChatMessage.init({
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
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'chat_messages',
});

ChatMessage.belongsTo(User, {
    foreignKey: 'user_id',
});

ChatMessage.belongsTo(Chat, {
    foreignKey: 'chat_id',
});

export { ChatMessage };