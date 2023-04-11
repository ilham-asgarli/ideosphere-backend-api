import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Event } from './event.model';

class EventLocation extends Model {
    public id!: string;
    public event_id!: string;
    public latitude!: number;
    public longitude!: number;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
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
}, {
    sequelize,
    tableName: 'event_locations',
});

EventLocation.belongsTo(Event, {
    foreignKey: 'event_id',
});

export { EventLocation };