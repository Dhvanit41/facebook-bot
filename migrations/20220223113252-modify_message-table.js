'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Messages', // table name
        'is_birthdate', // new field name
        {
          type: Sequelize.BOOLEAN,
        },
      ),
      queryInterface.addColumn(
        'Messages',
        'birthdate',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Messages', 'is_birthdate'),
      queryInterface.removeColumn('Messages', 'birthdate'),
    ]);
  }
};
