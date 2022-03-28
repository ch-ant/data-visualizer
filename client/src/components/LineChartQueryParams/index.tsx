import React from 'react';
import { Button, Container, Fade, Row } from 'reactstrap';
import logging from '../../config/logging';
import ICountry from '../../model/country';
import LineChartQueryParam from '../LineChartQueryParam';
import { Link } from 'react-router-dom';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../pages/select';
import CenterPiece from '../CenterPiece';

export interface ILineChartQueryParams {
    queryParams: IQueryParam[];
    countries: ICountry[];
    indicators: IIndicator[];
    setQueryParamsCounter: React.Dispatch<React.SetStateAction<number>>;
}

const LineChartQueryParams: React.FunctionComponent<ILineChartQueryParams> = (props) => {
    const { queryParams, countries, indicators, setQueryParamsCounter } = props;

    const addCountryIndicatorButton = (
        <Button
            color="light"
            outline
            style={{
                marginTop: '40px'
            }}
            onClick={() => {
                addNewQueryParam();
            }}
        >
            Add Country / Indicator
        </Button>
    );

    function addNewQueryParam() {
        let newQueryParam: IQueryParam = {
            id: queryParams.length,
            countryCode: '',
            countryName: '',
            indicatorCode: '',
            indicatorName: ''
        };
        queryParams.push(newQueryParam);
        setQueryParamsCounter(queryParams.length);

        logging.debug('Query params: ', queryParams);
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
                // to="/visual"
                to={{
                    pathname: '/visual',
                    state: { queryParams: queryParams }
                }}
                style={{
                    marginBottom: '70px'
                }}
            >
                Visualize
            </Button>
        </div>
    );

    function displayQueryParams() {
        return queryParams.map((queryParam, index) => {
            return (
                <Fade key={index} style={{ width: '75%' }}>
                    <LineChartQueryParam
                        countries={countries}
                        indicators={indicators}
                        queryParams={queryParams}
                        thisParam={queryParam}
                        setQueryParamsCounter={setQueryParamsCounter}
                    ></LineChartQueryParam>
                </Fade>
            );
        });
    }

    return (
        <Fade>
            <Container className="mt-5">
                <Row className="d-flex justify-content-center">
                    {displayQueryParams()}

                    <div style={addCountryIndicatorButtonStyle}> {addCountryIndicatorButton} </div>
                </Row>
            </Container>
            {visualizeButton}
        </Fade>
    );
};

export default LineChartQueryParams;
