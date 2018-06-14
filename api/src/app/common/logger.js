import bunyan from "bunyan";

const logger = bunyan.createLogger({
  name: "api",
  level: process.env.LOG_LEVEL || "info",
  serializers: bunyan.stdSerializers
});

if (process.env.NODE_ENV === "production") {
  logger.addStream({
    type: "rotating-file",
    path: "/var/log/api.log",
    period: "1d", // daily rotation
    count: 7 // keep 3 back copies
  });
}

export default logger;
