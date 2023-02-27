import express from 'express';

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

// create the express application
const app = express();
app.use(express.json());

// Setup the application
const cache = new DiskCache();
const workdays = new Workdays(cache);
const config = new Config(cache, workdays);

// define all the endpoints
app.get('/v1/:ref/isWorkday/:date', async (req, res): Promise<void> => {
  const { ref, date } = await validateIsWorkdayRequest(req.params);
  
  res.json(workdays.isWorkday(ref, date));
});

app.get('/v1/:ref/addWorkdays/:date/:add', async (req, res): Promise<void> => {
  const { ref, date, add } = await validateAddWorkdaysRequest(req.params);
  
  res.json(workdays.getWorkday(ref, date, add));
});

app.get('/v1/:ref/config', async (req, res): Promise<void> => {
  const { ref } = await validateGetConfigRequest(req.params);

  res.json(config.get(ref));
});

app.put('/v1/:ref/config', async (req, res): Promise<void> => {
  const { ref, body } = await validatePutConfigRequest({
    ref: req.params?.ref,
    body: req.body
  })

  // write the body to the config file
  config.write(ref, body);  

  res.json(true);
});

// start the application
app.listen(8181, (): void => {
  console.log('listening for requests');
});