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
    paramIndex: number;
    selectedChart: string;
}

const QueryParam: React.FunctionComponent<IQueryParamProps> = (props) => {
    let { countries, indicators, queryParams, setQueryParams, paramIndex, selectedChart } = props;

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
                removeQueryParam(paramIndex);
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

    function displayRemoveButton() {
        if (selectedChart !== 'Scatter Plot') return removeButton;
        return null;
    }

    return (
        <Col sm="15" className="mr-2 p-2">
            <Card body>
                <CountriesDropdown countries={countries} queryParams={queryParams} setQueryParams={setQueryParams} paramIndex={paramIndex}></CountriesDropdown>

                <IndicatorsDropdown indicators={indicators} queryParams={queryParams} setQueryParams={setQueryParams} paramIndex={paramIndex}></IndicatorsDropdown>

                <br></br>

                {displayRemoveButton()}
            </Card>
        </Col>
    );
};

export default QueryParam;
