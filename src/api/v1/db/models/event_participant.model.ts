import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { User } from './user.model';
import { Event } from './event.model';

class EventParticipant extends Model<InferAttributes<EventParticipant>, InferCreationAttributes<EventParticipant>> {
    declare id: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare event_id: ForeignKey<Event['id']>;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

EventParticipant.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'event_participants',
});

EventParticipant.belongsTo(User);
User.hasMany(EventParticipant, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
});

EventParticipant.belongsTo(Event);
Event.hasMany(EventParticipant, {
    foreignKey: {
        name: 'event_id',
        allowNull: false,
    }
});

export { EventParticipant };