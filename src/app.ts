import express, { NextFunction, Request, Response } from 'express';

// // Joi validation schema's
import {
  validateGetConfigRequest,
  validatePutConfigRequest,
  validateAddWorkdaysRequest,
  validateIsWorkdayRequest,
} from './validation/validators.js';

// business logic classes
import Workdays from './Workdays.js';
import DiskCache from './DiskCache.js';
import Config from './Config.js';
import Joi from 'joi';

// create the express application
const app = express();
app.use(express.json());

// Setup the application
const cache = new DiskCache();
const workdays = new Workdays(cache);
const config = new Config(cache, workdays);

// define all the endpoints
app.get('/v1/:ref/isWorkday/:date', async (req, res, nxt): Promise<void> => {
  try {
    const { ref, date } = await validateIsWorkdayRequest(req.params);

    res.json({
      success: true,
      result: workdays.isWorkday(ref, date),
    });
  } catch (e) {
    nxt(e);
  }
});

app.get('/v1/:ref/addWorkdays/:date/:add', async (req, res, nxt): Promise<void> => {
  try {
    const { ref, date, add } = await validateAddWorkdaysRequest(req.params);

    res.json({
      success: true,
      result: workdays.getWorkday(ref, date, add),
    });
  } catch (e) {
    nxt(e);
  }
});

app.get('/v1/:ref/config', async (req, res, nxt): Promise<void> => {
  try {
    const { ref } = await validateGetConfigRequest(req.params);

    res.json({
      success: true,
      result: config.get(ref),
    });
  } catch (e) {
    nxt(e);
  }
});

app.put('/v1/:ref/config', async (req, res, nxt): Promise<void> => {
  try {
    const { ref, body } = await validatePutConfigRequest({
      ref: req.params?.ref,
      body: req.body,
    });

    // write the body to the config file
    config.write(ref, body);

    res.json({
      success: true,
    });
  } catch (e) {
    nxt(e);
  }
});

// disabling this rule, next is needed or else the error handler will not be registered
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.log(err);
  res.status(500).json({
    success: false,
    error: (() => {
      switch (err?.name) {
        case 'ValidationError':
          return err.message;
        default:
          return 'Er is iets misgegaan';
      }
    })(),
  });
});

// start the application
app.listen(8181, (): void => {
  // eslint-disable-next-line no-console
  console.log('listening for requests');
});
