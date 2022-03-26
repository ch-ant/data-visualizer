import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import formatResponse from '../middleware/formatResponse';

const NAMESPACE = 'Measurements';

const getMeasurements = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Getting measurements.');

    let { id } = req.query;
    let query = `SELECT indicators.name AS indicator, countries.name AS country, 
        \`2010\`, \`2011\`, \`2012\`, \`2013\`, \`2014\`, \`2015\`,
        \`2016\`, \`2017\`, \`2018\`, \`2019\`, \`2020\`
        FROM measurements, countries, indicators
        WHERE (countries.id = ${id}
			AND (indicators.id = 4 OR indicators.id = 2 
            OR indicators.id = 3 OR indicators.id = 5 OR indicators.id = 9))
        AND countries.id = measurements.country_id
		AND indicators.id = measurements.indicator_id
        LIMIT 5;`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info('Retrieved measurements: ', results);
                    results = formatResponse(results);
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info('Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { getMeasurements };
