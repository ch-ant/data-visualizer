import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import logging from '../../config/logging';
import ICountry from '../../model/country';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../pages/select';
import SearchBar from '../SearchBar';

export interface ILineChartParams {
    setQueryParamsCounter: React.Dispatch<React.SetStateAction<number>>;
    countries: ICountry[];
    indicators: IIndicator[];
    queryParams: IQueryParam[];
    thisParam: IQueryParam;
}

const LineChartParams: React.FunctionComponent<ILineChartParams> = (props) => {
    let { countries, indicators, queryParams, thisParam, setQueryParamsCounter } = props;
    const [selectedCountry, setSelectedCountry] = useState<string>('Country');

    return (
        <Col sm="15" className="mr-2 p-2">
            <Card body>
                <DropdownButton drop="end" variant="dark" title={selectedCountry}>
                    {countries.length === 0 && (
                        <p className="p-4">
                            There are no countries in the database.<br></br> Sorry! 😢
                        </p>
                    )}

                    {countries.map((country, index) => {
                        return (
                            <Dropdown.Item
                                key={index}
                                onClick={() => {
                                    setSelectedCountry(country.name);
                                    thisParam.countryName = country.name;
                                    thisParam.countryCode = country.code;
                                }}
                            >
                                {country.name}
                            </Dropdown.Item>
                        );
                    })}
                </DropdownButton>
                <SearchBar indicators={indicators} param={thisParam}></SearchBar>
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
                <br></br>
                <Button
                    className="mt-4"
                    color="light"
                    outline
                    onClick={() => {
                        const index = queryParams.indexOf(thisParam);
                        queryParams.splice(index, 1);
                        setQueryParamsCounter(queryParams.length);
                    }}
                >
                    Remove
                </Button>
            </Card>
        </Col>
    );
};

export default LineChartParams;
