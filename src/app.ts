import express, { Request, Response, NextFunction } from 'express';

// // Joi validation schema's
import { ValidationError } from 'joi';

// business logic classes
import Workdays from './Workdays.js';
import DiskCache from './DiskCache.js';
import Config from './Config.js';

import ClientError from './errors/ClientError.js';
import registerRoutes from './registerRoutes.js';
import initializeSwagger from './initializeSwagger.js';

// create the express application
const app = express();
app.use(express.json());

initializeSwagger(app);

// Setup the application
const cache = new DiskCache();
const workdays = new Workdays(cache);
const config = new Config(cache, workdays);

// regenerates all the configs and puts then in memory
// and on disk if the config has changed
config.regenerateCache();

// define all the endpoints
registerRoutes(app, workdays, config);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'FAILED',
    error: 'invalid endpoint',
  });
});

// disabling this rule, next is needed or else the error handler will not be registered
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if ((<ValidationError>err)?.isJoi || (<ClientError>err)?.isClient) {
    console.info(`The following error occured: ${err.message}`);
    res.status(500).json({
      status: 'FAILED',
      error: err.message,
    });
    return;
  }
  // eslint-disable-next-line no-console
  console.error(err.stack);
  // eslint-disable-next-line no-console
  console.log(err);
  res.status(500).json({
    status: 'FAILED',
    error: 'Er is iets misgegaan',
  });
});

// start the application
app.listen(8181, (): void => {
  // eslint-disable-next-line no-console
  console.log('listening for requests');
});
