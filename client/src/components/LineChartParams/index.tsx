import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import logging from '../../config/logging';
import ICountry from '../../model/country';
import IIndicator from '../../model/indicator';
import SearchBar from '../Search';

export interface ILineChartParams {
    countries: ICountry[];
    indicators: IIndicator[];
}

const LineChartParams: React.FunctionComponent<ILineChartParams> = (props) => {
    let { countries, indicators } = props;
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
                    {countries.map((name, index) => {
                        return (
                            <div key={index}>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSelectedCountry(name.name);
                                    }}
                                >
                                    {name.name}
                                </Dropdown.Item>
                            </div>
                        );
                    })}
                </DropdownButton>
                <SearchBar indicators={indicators}></SearchBar>

                <br></br>
                <DropdownButton variant="dark" title={selectedCountry}>
                    <Dropdown.Item
                        onClick={() => {
                            setSelectedCountry('Action');
                        }}
                    >
                        Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <br></br>

                <DropdownButton variant="dark" title={selectedCountry}>
                    <Dropdown.Item
                        onClick={() => {
                            setSelectedCountry('Action');
                        }}
                    >
                        Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <Button className="mt-4" color="light" outline>
                    Remove
                </Button>
            </Card>
        </Col>
    );
};

export default LineChartParams;
