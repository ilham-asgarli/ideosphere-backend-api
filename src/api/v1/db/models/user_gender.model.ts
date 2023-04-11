import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class UserGender extends Model {
    public id!: number;
    public name!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

UserGender.init({
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
    tableName: 'user_genders',
});

export { UserGender };