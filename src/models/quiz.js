const Sequelize = require('sequelize');
const { sequelize } = require('./db.js');

const Quiz = sequelize.define('Quiz', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Quiz.associate = models => {
  Quiz.hasMany(models.Questions, { as: 'questions' });
}

module.exports = Quiz;