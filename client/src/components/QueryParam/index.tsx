import React from 'react';
import { Button, Card, Col } from 'reactstrap';
import ICountry from '../../model/country';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../interfaces/queryParam';
import CountriesDropdown from '../CountriesDropdown';
import IndicatorsDropdown from '../IndicatorsDropdown';

export interface IQueryParamProps {
    setQueryParams: React.Dispatch<React.SetStateAction<IQueryParam[]>>;
    countries: ICountry[];
    indicators: IIndicator[];
    queryParams: IQueryParam[];
    index: number;
}

const LineChartQueryParam: React.FunctionComponent<IQueryParamProps> = (props) => {
    let { countries, indicators, queryParams, setQueryParams, index } = props;

    const removeButtonStyle: React.CSSProperties = {
        width: '50%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%)'
    };

    const removeButton = (
        <Button
            style={removeButtonStyle}
            className="mt-2"
            color="danger"
            outline
            size="sm"
            onClick={() => {
                removeQueryParam(index);
            }}
        >
            Remove
        </Button>
    );

    const removeQueryParam = (index: number) => {
        let newQueryParams = [...queryParams];
        newQueryParams.splice(index, 1);
        setQueryParams(newQueryParams);
    };

    return (
        <Col sm="15" className="mr-2 p-2">
            <Card body>
                <CountriesDropdown countries={countries} queryParams={queryParams} setQueryParams={setQueryParams} paramIndex={index}></CountriesDropdown>

                <IndicatorsDropdown indicators={indicators} queryParams={queryParams} setQueryParams={setQueryParams} paramIndex={index}></IndicatorsDropdown>

                <br></br>

                {removeButton}
            </Card>
        </Col>
    );
};

export default LineChartQueryParam;
