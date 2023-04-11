import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class EventGender extends Model {
    public id!: number;
    public name!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

EventGender.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'event_genders',
});

export { EventGender };