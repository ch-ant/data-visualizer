import { Request } from 'express';
import logging from '../config/logging';
import IQueryParam from '../interfaces/queryParam';
import filterTime from './filterTime';

const buildQuery = (req: Request) => {
    let { queryParams, filterTimeParam } = req.query;
    const parsedQueryParams = parseQueryParams();
    const years = filterTime(filterTimeParam);

    function parseQueryParams() {
        const parsedQueryParams: IQueryParam[] = [];
        if (Array.isArray(queryParams)) {
            for (let i = 0; i < queryParams.length; i++) {
                const param = JSON.parse(queryParams[i].toString());
                parsedQueryParams.push({
                    countryId: param.countryId,
                    indicatorId: param.indicatorId
                });
            }
        }
        return parsedQueryParams;
    }

    logging.debug('parsedQueryParams: ', parsedQueryParams);

    function formatQueryParams(): string {
        let paramsString = '';
        for (let param of parsedQueryParams) {
            paramsString += `(country_id = ${param.countryId} AND indicator_id = ${param.indicatorId})\n`;
            if (parsedQueryParamsHasNext(param)) {
                paramsString += `OR `;
            }
        }
        return paramsString;
    }

    function parsedQueryParamsHasNext(param: IQueryParam) {
        return parsedQueryParams.indexOf(param) < parsedQueryParams.length - 1;
    }

    return `SELECT indicators.name AS indicator, countries.name AS country,
        ${years}
        FROM measurements, countries, indicators
        WHERE ( 
            ${formatQueryParams()}
        )
        AND country_id = countries.id 
        AND indicator_id = indicators.id`;
};

export default buildQuery;
