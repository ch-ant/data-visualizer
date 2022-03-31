import logging from '../config/logging';

const MIN_YEAR = 1960;
const MAX_YEAR = 2020;

const filterTime = (filterTimeParam: unknown) => {
    logging.info('Filtering time.');

    const parsedFilterTimeParam = parseFilterTimeParam();
    const years = buildYearsString();

    function parseFilterTimeParam() {
        if (typeof filterTimeParam === 'string') {
            const parsed = JSON.parse(filterTimeParam);
            return {
                from: parsed.from,
                to: parsed.to
            };
        }
        return {
            from: MIN_YEAR,
            to: MAX_YEAR
        };
    }

    function buildYearsString() {
        let yearsString = '';
        const from = parsedFilterTimeParam.from;
        const to = parsedFilterTimeParam.to;

        for (let year = from; year <= to; year++) {
            yearsString += `\`${year}\``;

            if (year !== to) {
                yearsString += `, `;
            }
        }
        return yearsString;
    }

    return years;
};

export default filterTime;
