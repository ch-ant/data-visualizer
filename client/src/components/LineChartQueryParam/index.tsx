import React, { useState } from 'react';
import { Button, Card, Col } from 'reactstrap';
import ICountry from '../../model/country';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../interfaces/queryParam';
import CountriesDropdown from '../CountriesDropdown';
import IndicatorsSearchBar from '../IndicatorsSearchBar';

export interface ILineChartQueryParam {
    setQueryParamsCounter: React.Dispatch<React.SetStateAction<number>>;
    countries: ICountry[];
    indicators: IIndicator[];
    queryParams: IQueryParam[];
    queryParam: IQueryParam;
}

const LineChartQueryParam: React.FunctionComponent<ILineChartQueryParam> = (props) => {
    let { countries, indicators, queryParams, queryParam, setQueryParamsCounter } = props;
    const [selectedCountry, setSelectedCountry] = useState<string>('Select Country');

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
                const index = queryParams.indexOf(queryParam);
                queryParams.splice(index, 1);
                setQueryParamsCounter(queryParams.length);
            }}
        >
            Remove
        </Button>
    );

    return (
        <Col sm="15" className="mr-2 p-2">
            <Card body>
                <CountriesDropdown selectedCountry={selectedCountry} countries={countries} setSelectedCountry={setSelectedCountry} queryParam={queryParam}></CountriesDropdown>

                <IndicatorsSearchBar indicators={indicators} queryParam={queryParam}></IndicatorsSearchBar>

                <br></br>

                {removeButton}
            </Card>
        </Col>
    );
};

export default LineChartQueryParam;
