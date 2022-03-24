import express from 'express';
import controller from '../controller/measurement';

const router = express.Router();

router.get('/get/measurements', controller.getMeasurements);

export = router;
