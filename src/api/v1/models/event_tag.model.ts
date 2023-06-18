import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { Event } from './event.model';

class EventTag extends Model<InferAttributes<EventTag>, InferCreationAttributes<EventTag>> {
  declare id: CreationOptional<string>;
  declare event_id: ForeignKey<Event['id']>;
  declare tag: string;
}

EventTag.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'event_tags',
  },
);

EventTag.belongsTo(Event, {
  foreignKey: {
    name: 'event_id',
    allowNull: false,
  },
});
Event.hasMany(EventTag, {
  foreignKey: {
    name: 'event_id',
    allowNull: false,
  },
});

export { EventTag };
