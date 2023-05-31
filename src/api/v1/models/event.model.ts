import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { User } from './user.model';
import { EventGender } from './event_gender.model';
import { Chat } from './chat.model';

class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id: CreationOptional<string>;
    declare gender_id: ForeignKey<EventGender['id']>;
    declare organizer_id: ForeignKey<User['id']>;
    declare chat_id: ForeignKey<Chat['id']>;
    declare name: string | null;
    declare description: string | null;
    declare address: string | null;
    declare start_time: Date | null;
    declare end_time: Date | null;
    declare max_age: number | null;
    declare min_age: number | null;
    declare entry_fee: number | null;
    declare participant_capacity: number | null;
}

Event.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 3000]
        }
    },
    address: DataTypes.STRING,
    start_time: {
        type: DataTypes.DATE,
        validate: {
            isAfterNow(value: Date): void {
                if (value <= new Date()) {
                    throw new Error('Start time must be after the current date.');
                }
            },
        },
    },
    end_time: {
        type: DataTypes.DATE,
        validate: {
            isAfterStart(value: Date): void {
                if (value <= (this.start_time as Date)) {
                    throw new Error('End time must be after the start time.');
                }
            },
        },
    },
    max_age: DataTypes.INTEGER.UNSIGNED,
    min_age: DataTypes.INTEGER.UNSIGNED,
    entry_fee: DataTypes.DOUBLE.UNSIGNED,
    participant_capacity: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
            min: 1,
        }
    },
}, {
    sequelize,
    tableName: 'events',
});

Event.belongsTo(EventGender, {
    foreignKey: {
        name: 'gender_id',
        allowNull: false,
    }
});
EventGender.hasMany(Event, {
    foreignKey: {
        name: 'gender_id',
        allowNull: false,
    }
});

Event.belongsTo(User, {
    foreignKey: {
        name: 'organizer_id',
        allowNull: false,
    }
});
User.hasMany(Event, {
    foreignKey: {
        name: 'organizer_id',
        allowNull: false,
    }
});

Event.belongsTo(Chat);
Chat.hasMany(Event, {
    foreignKey: {
        name: 'chat_id',
        allowNull: false,
    }
});

export { Event };