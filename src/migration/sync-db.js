const models = require('../models');

/**
 * Force initialize database. the old table will be replace with new structure
 */
models()
  .then(db => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => db.sequelize.sync({ force: true }))
    .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
    .then(() => {
      console.log('Sync database success!');
      return;
    }));