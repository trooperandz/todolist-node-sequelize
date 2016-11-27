'use strict';

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    notes: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.User);
        Task.belongsTo(models.Category);
      }
    }
  });
  return Task;
};