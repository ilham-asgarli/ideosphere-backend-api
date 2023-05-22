import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';
import { Event } from './event.model';

class EventParticipant extends Model<InferAttributes<EventParticipant>, InferCreationAttributes<EventParticipant>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare event_id: ForeignKey<Event['id']>;
}

EventParticipant.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
}, {
    sequelize,
    tableName: 'event_participants',
});

EventParticipant.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});
User.hasMany(EventParticipant, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

EventParticipant.belongsTo(Event, {
    foreignKey: {
        name: 'event_id',
        allowNull: false,
    }
});
Event.hasMany(EventParticipant, {
    foreignKey: {
        name: 'event_id',
        allowNull: false,
    }
});

export { EventParticipant };