import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Fade, Row } from 'reactstrap';
import LoadingComponent from '../components/Loading';
import config from '../config/config';
import logging from '../config/logging';
import ICountry from '../model/country';
import IPageProps from '../interfaces/page';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Background from '../components/Background';
import LineChartParams from '../components/LineChartParams';
import { Link } from 'react-router-dom';
import IIndicator from '../model/indicator';
import ChartSelectionButtonGroup from '../components/ChartSelectionButtonGroup';
import Gradient from '../components/Gradient';

const SelectPage: React.FunctionComponent<IPageProps> = (props) => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [indicators, setIndicators] = useState<IIndicator[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputCardsCounter, setInputCardsCounter] = useState<number>(0);
    const [lineChartSelected, setLineChartSelected] = useState<boolean>(false);
    const [barChartSelected, setBarChartSelected] = useState<boolean>(false);
    const [scatterPlotSelected, setScatterPlotSelected] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllcountries();
        getAllIndicators();
    }, []);

    const getAllcountries = async () => {
        setLoading(true);

        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/get/countries`
            });

            if (response.status == (200 || 304)) {
                logging.info(`Fetched country names:`, response.data.results);
                let countries = response.data.results as ICountry[];

                // Optionally sort the country names alphabetically
                countries.sort((x, y) => x.name.localeCompare(y.name));
                setCountries(countries);
            } else {
                setError(`Unable to retrieve countries`);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    };

    const getAllIndicators = async () => {
        setLoading(true);

        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/get/indicators`
            });

            if (response.status == (200 || 304)) {
                logging.info(`Fetched indicators:`, response.data.results);
                let indicators = response.data.results as IIndicator[];

                // Optionally sort the indicator names alphabetically
                indicators.sort((x, y) => x.name.localeCompare(y.name));
                setIndicators(indicators);
            } else {
                setError(`Unable to retrieve indicators`);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    };

    if (loading) {
        return <LoadingComponent>Fetching stuff...</LoadingComponent>;
    }

    return (
        <Container fluid className="p-0">
            <Navigation />
            <Background url={''}></Background>
            <Header headline="And they will come to life" title="Select Data"></Header>
            <Gradient rgba1={'rgba(33, 33, 33, 1.0)'} rgba2={'rgba(24, 24, 40, 0.8)'}>
                <ChartSelectionButtonGroup firstOption={setLineChartSelected} secondOption={setBarChartSelected} thirdOption={setScatterPlotSelected}></ChartSelectionButtonGroup>

                {lineChartSelected ? (
                    <Fade>
                        <Container className="mt-5">
                            <Row className="d-flex justify-content-center">
                                <LineChartParams countries={countries} indicators={indicators}></LineChartParams>
                                <div
                                    className="d-flex justify-content-center"
                                    style={{
                                        marginTop: '150px',
                                        marginLeft: '40px',
                                        height: '40%'
                                    }}
                                >
                                    <Button color="light" outline>
                                        <strong>Add Country / Indicator</strong>
                                    </Button>
                                </div>
                            </Row>
                        </Container>
                        <div className="d-flex justify-content-center mt-5">
                            <strong>
                                <Button size="lg" tag={Link} to="/visual">
                                    Visualize
                                </Button>
                            </strong>
                        </div>
                    </Fade>
                ) : (
                    <div></div>
                )}
            </Gradient>
        </Container>
    );
};

export default SelectPage;
