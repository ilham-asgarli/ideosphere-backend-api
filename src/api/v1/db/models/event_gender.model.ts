import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config';

class EventGender extends Model<InferAttributes<EventGender>, InferCreationAttributes<EventGender>> {
    declare id: CreationOptional<number>;
    declare name: string;

    declare created_at: Date;
    declare updated_at: Date;
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
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    sequelize,
    tableName: 'event_genders',
});

export { EventGender };