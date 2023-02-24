const express = require('express');

// Joi validation schema's
const { 
  validateGetConfigRequest, 
  validatePutConfigRequest, 
  validateAddWorkdaysRequest, 
  validateIsWorkdayRequest 
} = require('./src/validation');

// business logic classes
const Workdays = require('./src/Workdays');
const Config = require('./src/Config');
const Cache = require('./src/Cache');

// create the express application
const app = express();
app.use(express.json());

// Setup the application
const cache = new Cache();
const workdays = new Workdays(cache);
const config = new Config(cache, workdays);

// define all the endpoints
app.get('/v1/:ref/isWorkday/:date', async (req, res) => {
  const { ref, date } = await validateIsWorkdayRequest(req.params);
  
  res.json(workdays.isWorkday(ref, date));
});

app.get('/v1/:ref/addWorkdays/:date/:add', async (req, res) => {
  const { ref, date, add } = await validateAddWorkdaysRequest(req.params);
  
  res.json(workdays.getWorkday(ref, date, add));
});

app.get('/v1/:ref/config', async (req, res) => {
  const { ref } = await validateGetConfigRequest(req.params);

  res.json(config.get(ref));
});

app.put('/v1/:ref/config', async (req, res) => {
  const { ref, body } = await validatePutConfigRequest({
    ref: req.params?.ref,
    body: req.body
  })

  // write the body to the config file
  config.write(ref, body);  

  res.json(true);
});

// start the application
app.listen(8181, () => {
  console.log('listening for requests');
});

// we log the total memory used every minute such that we can monitor the memory usage
const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
setInterval(() => {
  console.log(formatMemoryUsage(process.memoryUsage().heapTotal));
}, 60000);
