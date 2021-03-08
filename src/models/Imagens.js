const { Model, DataTypes } = require('sequelize');

class Imagen extends Model {
  static init(sequelize) {
    super.init({
        path: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        original_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        id_anuncio: {
            type: DataTypes.UUID
        },
    }, {
      sequelize,
    });
  }
  static associate(models){
    this.belongsTo(models.Anuncio, { foreignKey: 'id_anuncio', as: 'users' });
  }
}

module.exports = Imagen;