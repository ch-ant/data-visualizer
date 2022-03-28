import { Request } from 'express';
import logging from '../config/logging';
import IQueryParam from '../interfaces/queryParam';

const years = `\`1960\`, \`1961\`, \`1962\`, \`1963\`, \`1964\`, 
        \`1965\`, \`1966\`, \`1967\`, \`1968\`, \`1969\`,
        \`1970\`, \`1971\`, \`1972\`, \`1973\`, \`1974\`, 
        \`1975\`, \`1976\`, \`1977\`, \`1978\`, \`1979\`, 
        \`1980\`, \`1981\`, \`1982\`, \`1983\`, \`1984\`, 
        \`1985\`, \`1986\`, \`1987\`, \`1988\`, \`1989\`, 
        \`1990\`, \`1991\`, \`1992\`, \`1993\`, \`1994\`, 
        \`1995\`, \`1996\`, \`1997\`, \`1998\`, \`1999\`, 
        \`2000\`, \`2001\`, \`2002\`, \`2003\`, \`2004\`, 
        \`2005\`, \`2006\`, \`2007\`, \`2008\`, \`2009\`, 
        \`2010\`, \`2011\`, \`2012\`, \`2013\`, \`2014\`, 
        \`2015\`, \`2016\`, \`2017\`, \`2018\`, \`2019\`, 
        \`2020\``;

const buildQuery = (req: Request) => {
    let { queryParams } = req.query;
    const parsedQueryParams = parseQueryParams();

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
