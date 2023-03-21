const express = require('express');
const { createQuiz, getQuiz } = require('./quiz.controller');
const { createQuizMiddleware } = require('./quiz.middleware');

const quizRouter = express.Router();

quizRouter.route('/quizzes').post(createQuizMiddleware, createQuiz);
quizRouter.route('/quizzes/:id').get(getQuiz);

module.exports = quizRouter;