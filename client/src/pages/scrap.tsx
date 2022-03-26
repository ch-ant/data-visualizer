import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Container, Dropdown, NavbarText } from 'reactstrap';
import LoadingComponent from '../components/Loading';
import config from '../config/config';
import logging from '../config/logging';
import ICountry from '../model/country';
import IPageProps from '../interfaces/page';
import CountryPreview from '../components/CountryPreview';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import CenterPiece from '../components/CenterPiece';
import BasicTransition from '../animations/BasicTransition';
import LineChartParams from '../components/LineChartParams';
import Background from '../components/Background';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // useEffect(() => {
    //     // getAllCountries();
    // }, []);

    const getAllCountries = async () => {
        setLoading(true);

        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/get/countries`,
                params: {
                    id: 1
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
    const opacity = 1.0;

    return (
        <Container fluid className="p-0">
            <Navigation />
            <Background url={''}></Background>

            <Header headline="Insightful data at a glance" title="Data Visualizer">
                <br></br>
                <br></br>
            </Header>
            <div
                style={{
                    background: `linear-gradient(rgba(33, 33, 33, ${opacity}), rgba(24, 24, 40, 0.5)`,
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}
            >
                <Container className="mt-5">
                    {countries.length === 0 && (
                        <p>
                            There are no countries in the database.<br></br> Sorry! 😢
                        </p>
                    )}
                    {countries.map((country, index) => {
                        return (
                            <div key={index}>
                                <CountryPreview
                                    id={country.id}
                                    name={country.name}
                                    code={country.code}
                                    region={country.region}
                                    income_group={country.income_group}
                                    special_notes={country.special_notes}
                                />
                                <hr />
                            </div>
                        );
                    })}
                    {/* <LineChartParams title="Country"></LineChartParams> */}
                    <CenterPiece>
                        <Container
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '20%',
                                WebkitTransform: 'translate(-50%, -50%)'
                            }}
                            className="d-flex justify-content-center"
                        >
                            <Button color="light" outline size="large" onClick={() => getAllCountries()}>
                                Let's go
                            </Button>
                        </Container>
                    </CenterPiece>
                </Container>
                <BasicTransition></BasicTransition>
            </div>
        </Container>
    );
};

export default HomePage;
