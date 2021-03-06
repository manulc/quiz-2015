// Definicion del modelo Quiz
module.exports = function(sequelize,DataTypes){
  return sequelize.define('Quiz',{
    pregunta: {
      type: DataTypes.STRING,
      validate: {notEmpty: {msg: "-> Falta la pregunta"}}
    },
    respuesta: {
      type: DataTypes.STRING,
      validate: {notEmpty: {msg: "-> Falta la respuesta"}}
    },
    categoria: {
      type: DataTypes.STRING
    }
  });
};
