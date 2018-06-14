import spdy from "spdy";
import os from "os";
import cluster from "cluster";
import logger from "./common/logger";
import app from './app';

const runServer = () => {
  logger.info(`API server worker ${process.pid} is starting up.`);

  process.on("exit", code =>
    logger.info(
      `API server worker ${process.pid} is exiting with code ${code}.`
    )
  );

  const options = {
    spdy: {
      plain: true,
      ssl: false
    }
  };

  const server = spdy.createServer(options, app.callback());

  const port = process.env.API_PORT || 8081;
  server.listen(port, () =>
    logger.info(`API server worker ${process.pid} is listening on port ${port}`)
  );
};

if (process.env.NODE_ENV === "production" && cluster.isMaster) {
  logger.info(`API server master ${process.pid} is running.`);

  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    const newWorker = cluster.fork();

    logger.info(
      `API server worker ${worker.process.pid} died, starting new worker ${
        newWorker.process.pid
      }`
    );
  });
} else {
  runServer();
}
