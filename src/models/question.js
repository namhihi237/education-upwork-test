const Sequelize = require('sequelize');
const { sequelize } = require('./db.js');

const Question = sequelize.define('Question', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: Sequelize.TEXT
  },
  isMandatory: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

Question.associate = models => {
  Question.hasMany(models.Answers, { as: 'answers' });
  Question.belongsTo(models.Quizzes);
}
module.exports = Question;