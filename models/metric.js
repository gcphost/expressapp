'use strict';
module.exports = (sequelize, DataTypes) => {
  const Metric = sequelize.define('Metric', {
    url: DataTypes.STRING,
  }, {});
  Metric.associate = function(models) {
    // associations can be defined here
  };
  return Metric;
};