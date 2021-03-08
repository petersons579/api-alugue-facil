'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('anuncios', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false, 
        },
        fkidusuario: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        },
        descricao: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        tipo_imovel: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        qtd_quartos: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        qtd_suite: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        area: {
          type: Sequelize.FLOAT,
          allowNull: true
        },
        preco: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        end_logradouro: {
          type: Sequelize.STRING,
          allowNull: false
        },
        end_num: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        end_complemento: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        end_bairro: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        end_cidade: {
          type: Sequelize.STRING,
          allowNull: false
        },
        end_estado: {
          type: Sequelize.STRING(2),
          allowNull: false
        },
        end_cep: {
          type: Sequelize.STRING(8),
          allowNull: false
        },
        situacao: {
          type: Sequelize.BOOLEAN,
          allowNull: false
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
      return queryInterface.dropTable('anuncios');
  }
};
