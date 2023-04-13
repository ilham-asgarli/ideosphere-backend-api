import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { Event } from './event.model';

class EventLocation extends Model<InferAttributes<EventLocation>, InferCreationAttributes<EventLocation>> {
    declare id: CreationOptional<string>;
    declare event_id: ForeignKey<Event['id']>;
    declare latitude: number;
    declare longitude: number;

    declare created_at: Date;
    declare updated_at: Date;
}

EventLocation.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    event_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Event,
            key: 'id',
        },
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'event_locations',
});

EventLocation.belongsTo(Event);
Event.hasOne(EventLocation, {
    foreignKey: {
        name: 'event_id',
        allowNull: false,
    }
});

export { EventLocation };