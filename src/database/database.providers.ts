import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: "./database.sqlite3"
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];