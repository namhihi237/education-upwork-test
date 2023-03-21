const { Sequelize } = require('sequelize');
const fs = require('fs');
const { sequelize } = require('./db.js');

module.exports = () => {
  let db = {};
  const MODEL_PATH = './src/models';

  return new Promise((resolved, reject) => {
    fs.readdir(MODEL_PATH, async (err, files) => {
      if (err) {
        reject(err);
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'db.js' && file.slice(-3) === '.js') {
            let model = await import(`./${file}`);
            model = model.default;
            db[model.tableName] = model;
          }
        }

        Object.keys(db).forEach(modelName => {
          if ('associate' in db[modelName]) {
            db[modelName].associate(db);
          }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        db.Op = Sequelize.Op;
        resolved(db);
      }
    });
  });
};