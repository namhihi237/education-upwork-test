const express = require('express');
const models = require('./models');
const { envVariable } = require('./config/env');

const quizRouterV1 = require('./api/quiz/quiz.router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '20mb', parameterLimit: 100 }));


(async function startServer() {
  try {
    const db = await models();
    app.db = db;

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use('/api/v1', quizRouterV1);

    await app.listen(envVariable.PORT, () => {
      console.log(`Server is running on port ${envVariable.PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
})()