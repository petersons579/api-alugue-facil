'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('imagens', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false, 
        },
        path: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        original_name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        id_anuncio: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'anuncios', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
      return queryInterface.dropTable('imagens');
  }
};
