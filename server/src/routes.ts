import express from 'express';
import { Request, Response } from 'express';
import countryController from './controller/country';
import indicatorController from './controller/indicator';
import measurementController from './controller/measurement';
import logging from './config/logging';
import config from './config/config';

const router = express.Router();

router.get('/check', (req: Request, res: Response) => {
    logging.info('Health check route called.');
    return res.status(200).json({
        message: `Server is up and running on: http://${config.server.hostname}:${config.server.port}`
    });
});

router.get('/get/countries', countryController.getAllCountries);
router.get('/get/indicators', indicatorController.getAllIndicators);
router.get('/get/measurements', measurementController.getMeasurements);

export = router;
