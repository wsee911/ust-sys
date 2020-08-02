import 'dotenv/config';
import sequelize from './config/database';
import Logger from './config/logger';
import App from './app';

const MAX_RETRY = 20;
const LOG = new Logger('server.js');
const { PORT = 3000 } = process.env;

const startApplication = async (retryCount: number) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    App.listen(PORT, () => {
      LOG.info(`Application started at http://localhost:${PORT}`);
    });

  } catch (e) {
    LOG.error(e);

    const nextRetryCount = retryCount - 1;
    if (nextRetryCount > 0) {
      setTimeout(async () => await startApplication(nextRetryCount), 3000);
      return;
    }

    LOG.error('Unable to start application');
  }
};

startApplication(MAX_RETRY);
