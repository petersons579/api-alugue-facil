const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model{
    static init(sequelize) {
        super.init({
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : {
                        msg: "Informe o email do usuário"
                    },
                    isEmail: {
                        msg: "Informe um email valido"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Informe a senha"
                    },
                    min: {
                        msg: "Informe uma senha com no minimo seis caracteres",
                        args: 6
                    }
                }
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Informe o nome"
                    }
                }
            },
            tipo_user: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Informe o tipo de usuário"
                    }
                }
            },
            telefone: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },{
            sequelize,
            hooks: {
                beforeCreate: user => {
                    user.password = bcrypt.hashSync(user.password, 10);
                }
            },
        });
    }
    static associate(models){
        this.hasMany(models.Anuncio, { foreignKey: 'fkidusuario', as: 'anuncios' });
    }
}

module.exports = User;