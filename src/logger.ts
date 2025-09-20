import winston, { Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  type LogData,
  type TransformedData,
} from 'winston-elasticsearch';

const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};

export const winstonLogger = (
  elasticSearchNode: string,
  name: string,
  level: string
): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    elasticsearch: {
      level,
      transformer: esTransformer,
      clientOpts: {
        node: elasticSearchNode,
        log: level,
        maxRetries: 2,
        requestTimeout: 10000,
        sniffOnStart: false,
      },
    },
  };

  const esTransport: ElasticsearchTransport = new ElasticsearchTransport(
    options.elasticsearch
  );
  const consoleTransport = new winston.transports.Console(options.console);
  const logger: Logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: { sevice: name },
    transports: [consoleTransport, esTransport],
  });

  return logger;
};
