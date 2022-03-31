import logging from '../config/logging';

const VALID_AGGREGATE_TIME_PARAM_VALUES = ['5', '10'];

const aggregateTime = (aggregateTimeParam: string, years: string) => {
    logging.info('Aggregating time');

    function buildAggregateYearsString() {
        const yearsArray = years.split(',');
        const meanDivider = parseInt(aggregateTimeParam);
        let counter = 1;
        let str = '';

        function isLastInYearsArray(year: string) {
            return parseInt(year) === yearsArray.length - 1;
        }

        function isFirstInMeanSubarray() {
            return counter === 1;
        }

        function isLastInMeanSubarray() {
            return counter === meanDivider;
        }

        for (let index in yearsArray) {
            const year = yearsArray[index];

            if (isLastInYearsArray(index)) {
                if (isFirstInMeanSubarray()) str += `(`;
                str += ` +${year} ) /${counter} AS ${year}\n`;
            } else if (isFirstInMeanSubarray()) {
                str += `( ${year}`;
                counter++;
            } else if (isLastInMeanSubarray()) {
                str += ` +${year} ) /${counter} AS ${year},\n`;
                counter = 1;
            } else {
                str += ` +${year}`;
                counter++;
            }
        }

        return str;
    }

    if (!VALID_AGGREGATE_TIME_PARAM_VALUES.includes(aggregateTimeParam)) {
        return years;
    }

    return buildAggregateYearsString();
};

export default aggregateTime;
