import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

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
    event_id: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
}, {
    sequelize,
    tableName: 'event_locations',
});

export { EventLocation };