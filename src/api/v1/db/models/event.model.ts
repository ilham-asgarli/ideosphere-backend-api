import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { EventGender } from './event_gender.model';
import { Chat } from './chat.model';

class Event extends Model {
    public id!: string;
    public gender_id!: number;
    public organizer_id!: string;
    public chat_id!: string;
    public name!: string;
    public description!: string;
    public address!: string;
    public start_time!: Date;
    public end_time!: Date;
    public max_age!: number;
    public min_age!: number;
    public entry_fee!: number;
    public participant_capacity!: number;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Event.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    gender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EventGender,
            key: 'id',
        },
    },
    organizer_id: {
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
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    max_age: DataTypes.INTEGER,
    min_age: DataTypes.INTEGER,
    entry_fee: DataTypes.DOUBLE,
    participant_capacity: DataTypes.INTEGER,
}, {
    sequelize,
    tableName: 'events',
});

Event.belongsTo(EventGender, {
    foreignKey: 'gender_id',
});

Event.belongsTo(User, {
    foreignKey: 'organizer_id',
});

Event.belongsTo(Chat, {
    foreignKey: 'chat_id',
});

export { Event };