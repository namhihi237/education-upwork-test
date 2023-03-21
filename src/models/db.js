const { Sequelize } = require('sequelize');
const { envVariable } = require('../config/env');
const { DATABASE_URL } = envVariable;

module.exports.sequelize = new Sequelize(DATABASE_URL, {
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
