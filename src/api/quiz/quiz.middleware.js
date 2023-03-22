const { responseFailure } = require('../../utils/response');
const { errorCode } = require('../../config/constants');
const {
  missing_title,
  missing_description,
  invalid_is_completed,
  invalid_questions,
  invalid_answers,
  no_correct_answer,
  answer_question_invalid,
  answerIds_invalid
} = errorCode;

module.exports.createQuizMiddleware = (req, res, next) => {
  const { title, description, isCompleted, questions } = req.body;
  const errors = [];

  if (!title) {
    errors.push(missing_title)
  }

  if (!description) {
    errors.push(missing_description)
  }

  if (isCompleted && typeof isCompleted !== 'boolean') {
    errors.push(invalid_is_completed);
  }

  if (questions && !Array.isArray(questions)) {
    errors.push(invalid_questions);
  }

  if (questions && Array.isArray(questions)) {
    for (const { answers } of questions) {
      if (answers && !Array.isArray(answers)) {
        !errors.includes(invalid_answers) ? errors.push(invalid_answers) : null;
      }

      if (isCompleted && answers && Array.isArray(answers)) {
        const hasCorrectAnswer = answers.some(answer => answer.isRight);
        if (!hasCorrectAnswer) {
          !errors.includes(no_correct_answer) ? errors.push(no_correct_answer) : null;
        }
      }
    }
  }

  if (errors.length > 0) {
    return responseFailure(res, errors, 400);
  }

  next();
}

module.exports.checkAnswerMiddleware = (req, res, next) => {
  const { answerQuestions } = req.body;
  const errors = [];
  if (answerQuestions && !Array.isArray(answerQuestions)) {
    errors.push(answer_question_invalid);
  }

  if (answerQuestions && Array.isArray(answerQuestions)) {
    for (const { answerIds } of answerQuestions) {
      if (answerIds && !Array.isArray(answerIds)) {
        !errors.includes(answerIds_invalid) ? errors.push(answerIds_invalid) : null;
      }
    }
  }

  if (errors.length > 0) {
    return responseFailure(res, errors, 400);
  }

  next();
}