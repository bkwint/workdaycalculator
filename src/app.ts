import express from 'express';

// business logic classes
import Workdays from './Workdays';
import DiskCache from './DiskCache';
import Config from './Config';

import registerRoutes from './middleware/registerRoutes';
import initializeSwagger from './middleware/initializeSwagger';
import handleFailures from './middleware/handleFailures';

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
handleFailures(app);

// start the application
app.listen(8181, (): void => {
  // eslint-disable-next-line no-console
  console.log('listening for requests');
});
