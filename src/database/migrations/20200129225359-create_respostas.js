'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('respostas', {
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
        idpergunta: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'perguntas', key: 'id' },
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
      return queryInterface.dropTable('respostas');
  }
};
