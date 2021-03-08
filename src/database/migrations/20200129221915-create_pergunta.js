'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('perguntas', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,  
      },
      idusuario: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      texto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_At: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_At: {
        type: Sequelize.DATE,
        allowNull: false,
      }
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
