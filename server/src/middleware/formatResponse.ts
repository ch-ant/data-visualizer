import logging from '../config/logging';

export interface IFormattedResponse extends Record<string, any> {
    year: string;
}

const formatResponse = (results: unknown) => {
    logging.info('Formatting Response.');

    let formattedResponse: IFormattedResponse[] = [];

    for (let item of results as Array<Object>) {
        let values = Object.values(item);
        let name = values.filter((x) => isNaN(x)).join(' - ');
        let filteredValues = values.filter(Number.isFinite);

        // logging.debug('Names: ', name);
        // logging.debug('Values: ', filteredValues);
        // logging.debug('Values length: ', filteredValues.length);

        let counter = 0;

        for (let key of Object.keys(item).filter(Number)) {
            let obj: IFormattedResponse = {
                year: key
            };

            if (!formattedResponse.some((item) => item.year === key)) {
                formattedResponse.push(obj);
            }
            const existingObj = formattedResponse[counter];

            existingObj[name] = values[counter++];
        }
    }

    return formattedResponse;
};

export default formatResponse;
