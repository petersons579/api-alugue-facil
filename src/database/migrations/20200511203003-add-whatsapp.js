'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 'telefone',
        { 
          type: Sequelize.STRING(15),
          allowNull: true,
          after: 'nome',
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','telefone');
  }
};
