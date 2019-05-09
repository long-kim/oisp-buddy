'use strict';

module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      report_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      response: {
        type: DataTypes.ENUM("resolved", "open"),
        values: ["resolved", "open"],
        allowNull: false
      }
    },
    {}
  );
  Report.associate = function(models) {
    // associations can be defined here  
    Report.belongsTo(models.User, { foreignKey: "reported_by" });
    Report.belongsTo(models.Thread, { foreignKey: "thread_id" });
  };
  return Report;
};
