import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

export interface CustomResponseItem extends Record<string, any> {
    year: string;
}

function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const formatResponse = (results: unknown) => {
    logging.info('Formatting Response');

    let customResponse: CustomResponseItem[] = [];

    for (let item of results as Array<Object>) {
        let values = Object.values(item);
        let name = values.filter((x) => isNaN(x)).toString();
        let filteredValues = values.filter(Number.isFinite);

        logging.debug('Names: ', name);
        logging.debug('Values: ', filteredValues);
        logging.debug('Values length: ', filteredValues.length);

        let counter = 0;

        for (let key of Object.keys(item).filter(Number)) {
            let obj: any = {};
            obj.year = key;

            if (!customResponse.some((item) => item.year === key)) {
                customResponse.push(obj);
            }
            const existingObj = customResponse[counter];

            existingObj[name] = values[counter++];
        }

        logging.debug('Custom Response: ', customResponse);
    }

    return customResponse;
};

export default formatResponse;
