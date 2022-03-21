import express from 'express';
import controller from '../controller/country';

const router = express.Router();

router.get('/get/countries', controller.getAllCountries);

export = router;
