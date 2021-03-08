const { Model, DataTypes } = require('sequelize');

class Anuncio extends Model {
  static init(sequelize) {
    super.init({
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe a descricao'
          }
        }
      },
      tipo_imovel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o tipo do imovel'
          }
        }
      },
      qtd_quartos: {
        type: DataTypes.STRING,
        allowNull: true
      },
      qtd_suite: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o preco'
          }
        }
      },
      end_logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o logradouro'
          }
        }
      },
      end_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o numero do imovel'
          }
        }
      },
      end_complemento: {
        type: DataTypes.STRING,
        allowNull: true
      },
      end_bairro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o bairro'
          }
        }
      },
      end_cidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe a cidade'
          }
        }
      },
      end_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o estado'
          }
        }
      },
      end_cep: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o CEP'
          }
        }
      },
      situacao: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe a situação'
          }
        }
      },
      fkidusuario: {
        type: DataTypes.UUID
      },
    }, {
      sequelize,
    });
  }

  static associate(models){
    this.hasMany(models.Imagen, { foreignKey: 'id_anuncio', as: 'images' });
    this.belongsTo(models.User, { foreignKey: 'fkidusuario', as: 'locatario' });
  }
}

module.exports = Anuncio;