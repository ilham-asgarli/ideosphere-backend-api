import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { Event } from './event.model';

class EventLocation extends Model<InferAttributes<EventLocation>, InferCreationAttributes<EventLocation>> {
  declare id: CreationOptional<string>;
  declare event_id: ForeignKey<Event['id']>;
  declare latitude: number;
  declare longitude: number;
}

EventLocation.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
      },
    },
  },
  {
    sequelize,
    tableName: 'event_locations',
  },
);

EventLocation.belongsTo(Event, {
  foreignKey: {
    name: 'event_id',
    allowNull: false,
  },
});
Event.hasOne(EventLocation, {
  foreignKey: {
    name: 'event_id',
    allowNull: false,
  },
});

export { EventLocation };
