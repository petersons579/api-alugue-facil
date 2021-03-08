const { Model, DataTypes } = require('sequelize');

class Respostas extends Model {
  static init(sequelize) {
    super.init({
      texto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o texto da resposta'
          }
        }
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe a data'
          }
        }
      },
      idusuario: {
        type: DataTypes.UUID
      },
      idpergunta: {
        type: DataTypes.UUID
      },
      idanuncio: {
        type: DataTypes.UUID
      }
    }, {
      sequelize,
    });
  }
}

module.exports = Respostas;