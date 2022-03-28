import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Button, Card, Col } from 'reactstrap';
import ICountry from '../../model/country';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../pages/select';
import CountriesDropdown from '../CountriesDropdown';
import IndicatorsSearchBar from '../IndicatorsSearchBar';

export interface ILineChartQueryParam {
    setQueryParamsCounter: React.Dispatch<React.SetStateAction<number>>;
    countries: ICountry[];
    indicators: IIndicator[];
    queryParams: IQueryParam[];
    thisParam: IQueryParam;
}

const LineChartQueryParam: React.FunctionComponent<ILineChartQueryParam> = (props) => {
    let { countries, indicators, queryParams, thisParam, setQueryParamsCounter } = props;
    const [selectedCountry, setSelectedCountry] = useState<string>('Select Country');

    const removeButtonStyle: React.CSSProperties = {
        width: '50%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%)'
    };

    const filterTimeSelection = (
        // TODO
        <DropdownButton variant="dark" title="TODO">
            <Dropdown.Item
                onClick={() => {
                    setSelectedCountry('Action');
                }}
            >
                Action
            </Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
        </DropdownButton>
    );

    const removeButton = (
        <Button
            style={removeButtonStyle}
            className="mt-2"
            color="light"
            outline
            size="sm"
            onClick={() => {
                const index = queryParams.indexOf(thisParam);
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
                <CountriesDropdown selectedCountry={selectedCountry} countries={countries} setSelectedCountry={setSelectedCountry} thisParam={thisParam}></CountriesDropdown>

                <IndicatorsSearchBar indicators={indicators} param={thisParam}></IndicatorsSearchBar>

                {filterTimeSelection}

                <br></br>

                {removeButton}
            </Card>
        </Col>
    );
};

export default LineChartQueryParam;
