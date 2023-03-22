const express = require('express');
const { createQuiz, getQuiz, checkAnswer } = require('./quiz.controller');
const { createQuizMiddleware, checkAnswerMiddleware } = require('./quiz.middleware');

const quizRouter = express.Router();

quizRouter.route('/quizzes').post(createQuizMiddleware, createQuiz);
quizRouter.route('/quizzes/:id').get(getQuiz);
quizRouter.route('/quizzes/:id/check-answer').post(checkAnswerMiddleware, checkAnswer);

module.exports = quizRouter;