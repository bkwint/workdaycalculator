import {
  Express, NextFunction, Request, Response,
} from 'express';
import { ValidationError } from 'joi';
import ClientError from '../errors/ClientError';

const handleFailures = (app: Express) => {
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
      // eslint-disable-next-line no-console
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
};

export default handleFailures;
