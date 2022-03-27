import React from 'react';
import { Button, Container, Fade, Row } from 'reactstrap';
import logging from '../../config/logging';
import ICountry from '../../model/country';
import LineChartQueryParam from '../LineChartQueryParam';
import { Link } from 'react-router-dom';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../pages/select';

export interface ILineChartQueryParams {
    queryParams: IQueryParam[];
    countries: ICountry[];
    indicators: IIndicator[];
    setQueryParamsCounter: React.Dispatch<React.SetStateAction<number>>;
}

const LineChartQueryParams: React.FunctionComponent<ILineChartQueryParams> = (props) => {
    const { queryParams, countries, indicators, setQueryParamsCounter } = props;

    return (
        <Fade>
            <Container className="mt-5">
                <Row className="d-flex justify-content-center">
                    {queryParams.map((queryParam, index) => {
                        return (
                            <Fade key={index}>
                                <LineChartQueryParam
                                    countries={countries}
                                    indicators={indicators}
                                    queryParams={queryParams}
                                    thisParam={queryParam}
                                    setQueryParamsCounter={setQueryParamsCounter}
                                ></LineChartQueryParam>
                            </Fade>
                        );
                    })}

                    <div
                        // className="d-flex justify-content-center"
                        style={{
                            paddingLeft: '49px',
                            paddingRight: '48px',
                            paddingTop: '5px',
                            paddingBottom: '5px'
                        }}
                    >
                        <Fade>
                            <Button
                                color="light"
                                outline
                                style={{
                                    marginTop: '40px'
                                }}
                                onClick={() => {
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
                                }}
                            >
                                <strong>Add Country / Indicator</strong>
                            </Button>
                        </Fade>
                    </div>
                </Row>
            </Container>
            <div className="d-flex justify-content-center mt-5">
                <strong>
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
                </strong>
            </div>
        </Fade>
    );
};

export default LineChartQueryParams;
