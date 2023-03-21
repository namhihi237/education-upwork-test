require('dotenv').config();

module.exports.envVariable = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:namvippro23799@localhost:3306/test',
};