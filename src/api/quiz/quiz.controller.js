const Quizzes = require('../../models/quiz');
const Questions = require('../../models/question');
const Answers = require('../../models/answer');
const { responseFailure, responseSuccess } = require('../../utils/response');
const { sequelize } = require('../../models/db');
const { errorCode } = require('../../config/constants');

module.exports.createQuiz = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { title, description, isCompleted, questions } = req.body;

    let quiz = await Quizzes.create({ title, description, isCompleted });
    quiz = JSON.parse(JSON.stringify(quiz));

    if (questions.length > 0) {
      const createQuestions = [];
      const createAnswers = [];
      for (let question of questions) {
        const { content, isMandatory } = question;
        createQuestions.push({ content, isMandatory, QuizId: quiz.id });
      }

      let newQuestions = await Questions.bulkCreate(createQuestions);
      newQuestions = JSON.parse(JSON.stringify(newQuestions));

      newQuestions.forEach((question, index) => {
        const answers = questions[index].answers?.map((answer) => {
          return {
            ...answer,
            QuestionId: question.id
          }
        });

        if (answers?.length > 0) {
          createAnswers.push(...answers);
        }
      });
      let newAnswers = await Answers.bulkCreate(createAnswers);
      newAnswers = JSON.parse(JSON.stringify(newAnswers));

      newQuestions.forEach((question) => {
        const answers = newAnswers.filter((answer) => {
          return answer.QuestionId === question.id;
        });
        question.answers = answers;
      });

      quiz['questions'] = newQuestions;
    }
    await t.commit();
    responseSuccess(res, quiz, 201)
  } catch (error) {
    await t.rollback();
    responseFailure(res, [errorCode.serverError], 500)
  }
}

module.exports.getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quizzes.findOne({
      where: { id },
      include: [{
        model: Questions,
        as: 'questions',
        include: [{
          model: Answers,
          as: 'answers',
        }]
      }],
    });
    responseSuccess(res, quiz)
  } catch (error) {
    console.log(error);
    responseFailure(res, [errorCode.serverError], 500)
  }
}