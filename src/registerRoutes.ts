import { Express } from 'express';
import {
  validateAddWorkdaysRequest,
  validateGetConfigRequest,
  validateIsWorkdayRequest,
  validatePutConfigRequest,
} from './validation/validators';
import { holidays as nl } from './lib/zones/nl';
import { holidays as be } from './lib/zones/be';
import ZoneNotFoundError from './errors/ZoneNotFoundError';
import Workdays from './Workdays';
import Config from './Config';

const registerRoutes = (app: Express, workdays: Workdays, config: Config) => {
  /**
   * @openapi
   * /v1/:ref/isWorkday/:date:
   *   get:
   *     description: returns if the given date is a workday or not
   *     responses:
   *       200:
   *         content:
   *            application/json:
   *                schema:
   *                    type: object
   *                    properties:
   *                      success:
   *                        type: string
   *                        description: if the call was successful or not
   *                        example: "SUCCESS"
   *                      result:
   *                        type: boolean
   *                        description: true if it is a workday, false if not
   */
  app.get('/v1/:ref/isWorkday/:date', async (req, res, next): Promise<void> => {
    try {
      const { ref, date } = await validateIsWorkdayRequest(req.params);

      res.json({
        status: 'SUCCESS',
        result: workdays.isWorkday(ref, date),
      });
    } catch (e) {
      next(e);
    }
  });

  /**
   * @openapi
   * /v1/:ref/addWorkdays/:date/:add:
   *   get:
   *     description: returns the date after the given number of workdays have passed
   *     responses:
   *       200:
   *         content:
   *            application/json:
   *                schema:
   *                    type: object
   *                    properties:
   *                      success:
   *                        type: string
   *                        description: if the call was successful or not
   *                        example: "SUCCESS"
   *                      result:
   *                        type: string
   *                        description: the date of the workday after the given days
   *                        example: "2022-02-02"
   */
  app.get('/v1/:ref/addWorkdays/:date/:add', async (req, res, next): Promise<void> => {
    try {
      const { ref, date, add } = await validateAddWorkdaysRequest(req.params);

      res.json({
        status: 'SUCCESS',
        result: workdays.getWorkday(ref, date, add),
      });
    } catch (e) {
      next(e);
    }
  });

  /**
   * @openapi
   * /v1/:ref/config:
   *   get:
   *       description: returns the config for the given ref
   *       responses:
   *         200:
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   success:
   *                     type: string
   *                     description: if the call was successful or not
   *                     example: "SUCCESS"
   *                   result:
   *                     type: object
   *                     properties:
   *                       zone:
   *                         type: string
   *                         description: zone for the configuration
   *                       workdays:
   *                         type: array
   *                         description: the days that are worked
   *                         items:
   *                           type: string
   *                       numberOfYears:
   *                         type: number
   *                         description: the number of years that the cache should be generated for
   *                         items:
   *                           type: number
   *                       exclude:
   *                         type: array
   *                         description: the holidays to exclude
   *                         items:
   *                           type: string
   *                       excludeHolidays:
   *                         type: array
   *                         description: the holidays to exclude
   *                         items:
   *                           type: string
   */
  app.get('/v1/:ref/config', async (req, res, next): Promise<void> => {
    try {
      const { ref } = await validateGetConfigRequest(req.params);

      res.json({
        status: 'SUCCESS',
        result: config.get(ref),
      });
    } catch (e) {
      next(e);
    }
  });

  /**
   * @openapi
   * /v1/:ref/config:
   *   put:
   *     description: update the config for the given ref
   *     requestBody:
   *       description: Optional description in *Markdown*
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *               type: object
   *               properties:
   *                   zone:
   *                     type: string
   *                     description: zone for the configuration
   *                   workdays:
   *                     type: array
   *                     description: the days that are worked
   *                     items:
   *                       type: string
   *                   numberOfYears:
   *                     type: number
   *                     description: the number of years that the cache should be generated for
   *                     items:
   *                       type: number
   *                   exclude:
   *                     type: array
   *                     description: the holidays to exclude
   *                     items:
   *                       type: string
   *                   excludeHolidays:
   *                     type: array
   *                     description: the holidays to exclude
   *                     items:
   *                       type: string
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: string
   *                   description: if the call was successful or not
   *                   example: "SUCCESS"
   */
  app.put('/v1/:ref/config', async (req, res, next): Promise<void> => {
    try {
      const { ref, body } = await validatePutConfigRequest({
        ref: req.params?.ref,
        body: req.body,
      });

      // write the body to the config file
      config.write(ref, body);

      res.json({
        status: 'SUCCESS',
      });
    } catch (e) {
      next(e);
    }
  });

  /**
   * @openapi
   * /v1/holidays/:zone:
   *   get:
   *       description: returns a list of holidays for a given zone
   *       responses:
   *         200:
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   success:
   *                     type: string
   *                     description: if the call was successful or not
   *                     example: "SUCCESS"
   *                   result:
   *                     type: array
   *                     description: the holidays
   *                     items:
   *                        type: string
   */
  app.get('/v1/holidays/:zone', async (req, res, next): Promise<void> => {
    try {
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
        status: 'SUCCESS',
        result: holidays,
      });
    } catch (e) {
      next(e);
    }
  });
};

export default registerRoutes;
