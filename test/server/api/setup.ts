import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();

const config = {
  db: {
    test: 'mongodb://localhost/test',
  },
  connection: null,
};

function connect() {
  return new Promise((resolve, reject) => {
    const mongoUri = process.env.MONGO_URL_TEST;
    const options = {
      server: {
        auto_reconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    };

    mongoose.connect(mongoUri, options);

    config.connection = mongoose.connection;

    config.connection
      .once('open', resolve)
      .on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          mongoose.connect(mongoUri, options);
        }
        reject(e);
      });
  });
}

function clearDatabase() {
  return new Promise(resolve => {
    let cont = 0;
    let max = Object.keys(mongoose.connection.collections).length;
    // tslint:disable-next-line:forin
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(() => {
        cont++;
        if (cont >= max) {
          resolve();
        }
      });
    }
  });
}

export async function setupTest() {
  await connect();
  await clearDatabase();
}
