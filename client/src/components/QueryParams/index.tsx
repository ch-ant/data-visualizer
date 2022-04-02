import React, { useEffect, useState } from 'react';
import { Button, Container, Fade, Row } from 'reactstrap';
import logging from '../../config/logging';
import ICountry from '../../model/country';
import QueryParam from '../QueryParam';
import { Link } from 'react-router-dom';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../interfaces/queryParam';
import TimeQueryParams from '../TimeQueryParams';

export interface IQueryParamsProps {
    countries: ICountry[];
    indicators: IIndicator[];
    selectedChart: string;
}

const QueryParams: React.FunctionComponent<IQueryParamsProps> = (props) => {
    const { countries, indicators, selectedChart } = props;
    const [queryParams, setQueryParams] = useState<IQueryParam[]>([]);

    useEffect(() => {
        if (selectedChart === 'Scatter Plot') addQueryParamsForScatterPlot();
    }, []);

    const addCountryIndicatorButton = (
        <Button
            color="light"
            outline
            style={{
                marginTop: '40px'
            }}
            onClick={() => {
                addQueryParam();
            }}
        >
            Add Country / Indicator
        </Button>
    );

    function addQueryParam() {
        setQueryParams([...queryParams, { countryId: BigInt(0), indicatorId: BigInt(0) }]);

        logging.debug('Query params: ', queryParams);
    }

    function addQueryParamsForScatterPlot() {
        setQueryParams([...queryParams, { countryId: BigInt(0), indicatorId: BigInt(0) }, { countryId: BigInt(0), indicatorId: BigInt(0) }]);
    }

    const addCountryIndicatorButtonStyle = {
        paddingLeft: '49px',
        paddingRight: '48px',
        paddingTop: '5px',
        paddingBottom: '5px'
    };

    const visualizeButton = (
        <div className="d-flex justify-content-center mt-5">
            <Button
                size="lg"
                tag={Link}
                to="/visual"
                style={{
                    marginBottom: '70px'
                }}
                onClick={() => {
                    sessionStorage.queryParams = JSON.stringify(queryParams);
                    sessionStorage.selectedChart = selectedChart;
                }}
            >
                Visualize
            </Button>
        </div>
    );

    function displayAddCountryIndicatorButton() {
        if (selectedChart === 'Scatter Plot') return null;
        return <div style={addCountryIndicatorButtonStyle}> {addCountryIndicatorButton} </div>;
    }

    function displayQueryParams() {
        return queryParams.map((param, index) => {
            return (
                <Fade key={index} style={{ width: '50%' }}>
                    <QueryParam
                        key={index}
                        countries={countries}
                        indicators={indicators}
                        queryParams={queryParams}
                        setQueryParams={setQueryParams}
                        paramIndex={index}
                        selectedChart={selectedChart}
                    ></QueryParam>
                </Fade>
            );
        });
    }

    return (
        <Fade>
            <Container className="mt-5 ">
                <Row className="d-flex justify-content-center">
                    {displayQueryParams()}

                    {displayAddCountryIndicatorButton()}
                </Row>
            </Container>
            <TimeQueryParams></TimeQueryParams>

            {visualizeButton}
        </Fade>
    );
};

export default QueryParams;
