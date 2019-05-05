"use strict";

module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define(
        "Friend",
        {
            friend_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            }
        },
        {}
    );
    Friend.associate = function(models){
        Friend.belongsTo(models.User, {foreignKey: "befriend_id"})
    };
    return Friend;
}