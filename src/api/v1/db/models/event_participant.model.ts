import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { Event } from './event.model';

class EventParticipant extends Model {
    public id!: string;
    public user_id!: string;
    public event_id!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

EventParticipant.init({
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
    event_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Event,
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'event_participants',
});

EventParticipant.belongsTo(User, {
    foreignKey: 'user_id',
});

EventParticipant.belongsTo(Event, {
    foreignKey: 'event_id',
});

export { EventParticipant };