'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('perguntas', 'idanuncio',
      { 
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'anuncios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('perguntas','idanuncio');
  }
};