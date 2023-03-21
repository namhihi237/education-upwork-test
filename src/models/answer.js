const Sequelize = require('sequelize');
const { sequelize } = require('./db.js');

const Answer = sequelize.define('Answer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: Sequelize.TEXT,
  },
  isRight: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

Answer.associate = models => {
  Answer.belongsTo(models.Questions);
}
module.exports = Answer;