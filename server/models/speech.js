module.exports = (sequelize, DataTypes) =>
   sequelize.define(
      'speech',
      {
         id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         author: {
            type: DataTypes.STRING(250),
            allowNull: false,
         },
         title: {
            type: DataTypes.STRING(200),
            allowNull: false,
         },
         content: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         keyWords: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         date: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
         },
      },
      {
         tableName: 'speech',
      }
   );
