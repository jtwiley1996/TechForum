const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // Method to check if a password matches the hashed password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        // Define model attributes
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure username is unique
            validate: {
                notNull: {
                    msg: 'Please provide a username.', // Custom error message for not null validation
                },
                len: {
                    args: [3, 30],
                    msg: 'Username must be between 3 and 30 characters long.', // Custom error message for length validation
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure email is unique
            validate: {
                notNull: {
                    msg: 'Please provide an email address.', // Custom error message for not null validation
                },
                isEmail: {
                    msg: 'Please provide a valid email address.', // Custom error message for email format validation
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a password.', // Custom error message for not null validation
                },
                len: {
                    args: [8, 255], // Minimum password length increased to 8 characters
                    msg: 'Password must be at least 8 characters long.', // Custom error message for length validation
                },
            },
        },
    },
    {
        // Hooks to hash the password before user creation and update
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
