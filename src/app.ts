import express, { Request, Response, NextFunction } from 'express';

// // Joi validation schema's
import { 
  validateGetConfigRequest, 
  validatePutConfigRequest, 
  validateAddWorkdaysRequest, 
  validateIsWorkdayRequest 
} from './validation/validators.js';

// business logic classes
import Workdays from './Workdays.js';
import DiskCache from './DiskCache.js';
import Config from './Config.js';

import { holidays as nl } from './lib/zones/nl.js';
import { holidays as be } from './lib/zones/be.js';
import ZoneNotFoundError from './errors/ZoneNotFoundError.js';

// create the express application
const app = express();
app.use(express.json());

// Setup the application
const cache = new DiskCache();
const workdays = new Workdays(cache);
const config = new Config(cache, workdays);


// regenerates all the configs and puts then in memory
// and on disk if the config has changed
config.regenerateCache();

// define all the endpoints
app.get('/v1/:ref/isWorkday/:date', async (req, res, next): Promise<void> => {
  try {
    const { ref, date } = await validateIsWorkdayRequest(req.params);

    res.json({
      status: 1,
      result: workdays.isWorkday(ref, date)
    });
  } catch (e) {
    next(e);
  }
});

app.get('/v1/:ref/addWorkdays/:date/:add', async (req, res, next): Promise<void> => {
  try {
    const { ref, date, add } = await validateAddWorkdaysRequest(req.params);

    res.json({
      status: 1,
      result: workdays.getWorkday(ref, date, add)
    });
  } catch (e) {
    next(e);
  }
});

app.get('/v1/:ref/config', async (req, res, next): Promise<void> => {
  try {
    const { ref } = await validateGetConfigRequest(req.params);

    res.json({
      status: 1,
      result: config.get(ref)
    });
  } catch (e) {
    next(e);
  }  
});

app.put('/v1/:ref/config', async (req, res, next): Promise<void> => {
  try {
    const { ref, body } = await validatePutConfigRequest({
      ref: req.params?.ref,
      body: req.body
    })

    // write the body to the config file
    config.write(ref, body);  

    res.json({
      status: 1
    });
  } catch (e) {
    next(e);
  }
});

app.get('/v1/holidays/:zone', async (req, res, next): Promise<void> => {
  let holidays = [];
  switch (req.params?.zone) {
    case 'nl':
      holidays = nl;
      break;
    case 'be':
      holidays = be;
      break;
    default:
      throw new ZoneNotFoundError(`Zone ${req.params?.zone} not found`);
  }

  res.json({
    status: 1,
    result: holidays
  });
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 2,
    message: err.message
  });
});

// start the application
app.listen(8181, (): void => {
  console.log('listening for requests');
});