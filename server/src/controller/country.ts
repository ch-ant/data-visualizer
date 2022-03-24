import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Countries';

const getAllCountries = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Getting all countries.');

    let { id } = req.query;
    let query = `SELECT * FROM countries WHERE id=${id} LIMIT 5;`;
    logging.debug(query);

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info('Retrieved countries: ', results);

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

export default { getAllCountries };
