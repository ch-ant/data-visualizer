import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, CardText, Col, Container, Fade, Row } from 'reactstrap';
import LoadingComponent from '../components/Loading';
import config from '../config/config';
import logging from '../config/logging';
import ICountry from '../model/country';
import IPageProps from '../interfaces/page';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import CenterPiece from '../components/CenterPiece';
import Background from '../components/Background';
import { Link } from 'react-router-dom';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [opacity, setOpacity] = useState<number>(0.3);

    const getAllCountries = async () => {
        setLoading(true);

        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/get/countries`,
                params: {
                    id: 3
                }
            });

            if (response.status == (200 || 304)) {
                logging.info(`Fetched countries:`, response.data.results);
                let countries = response.data.results as ICountry[];

                // Optionally sort the countries alphabetically based on names
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

    if (loading) {
        return <LoadingComponent>Loading countries...</LoadingComponent>;
    }

    return (
        <Container fluid className="p-0">
            <Navigation />
            <Background url={''}></Background>
            <Header headline="Insightful data at a glance" title="Data Visualizer"></Header>
            <div
                style={{
                    background: `linear-gradient(rgba(33, 33, 33, ${opacity}), rgba(24, 24, 40, 0.5)`,
                    position: 'absolute',
                    objectFit: 'fill',
                    width: '100%',
                    height: '700px'
                }}
            >
                <Fade>
                    <CenterPiece>
                        <Row className="d-flex justify-content-center">
                            <Col sm="15">
                                <Card body>
                                    <CardText>
                                        <p>
                                            The final goal of the project was to implement a data <br></br>visualization application which utilizes data integrated <br></br>into a database. The
                                            application should be able to be <br></br>used in order to visually draw conclusions regarding the <br></br>depicted data. The data which populates the
                                            database
                                            <br></br>was extracted from The World Bank and it contains various <br></br>measurements per year for different indicators for the
                                            <br></br>
                                            countries of the European Union.
                                        </p>
                                    </CardText>
                                    <Button tag={Link} to="/select">
                                        Let's go
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </CenterPiece>
                </Fade>
            </div>
        </Container>
    );
};

export default HomePage;
