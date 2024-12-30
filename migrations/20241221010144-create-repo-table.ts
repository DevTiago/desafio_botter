import { QueryInterface, DataTypes } from "sequelize";  

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("repos", {
      repo_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main_language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creation_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },
  
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("repos");
  }
}