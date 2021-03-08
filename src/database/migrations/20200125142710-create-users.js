'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false, 
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tipo_user : {
          type: Sequelize.STRING(100),
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
      return queryInterface.dropTable('users');
  }
};
