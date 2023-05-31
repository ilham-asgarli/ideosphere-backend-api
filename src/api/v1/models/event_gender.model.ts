import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/sequelize.config';

class EventGender extends Model<InferAttributes<EventGender>, InferCreationAttributes<EventGender>> {
    declare id: CreationOptional<number>;
    declare name: string;
}

EventGender.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'event_genders',
});

export { EventGender };