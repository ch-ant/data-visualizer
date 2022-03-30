import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import formatResponse from '../middleware/formatResponse';
import buildQuery from '../middleware/buildQuery';

const NAMESPACE = 'Measurements';

const getMeasurements = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Getting measurements.');

    const query = buildQuery(req);
    logging.debug('query: ', query);

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
