import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
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

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllCountries();
    }, []);

    const getAllCountries = async () => {
        logging.info(`This is just a test api call to: ${config.server.url}/get/countries`);

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

    const videoUrl =
        'https://vod-progressive.akamaized.net/exp=1648170358~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1767%2F11%2F283838731%2F1067680839.mp4~hmac=fabf13fe3bf271c1ec23886be2f196d22950bc907a6ddfe8410ea7992a9824fa/vimeo-prod-skyfire-std-us/01/1767/11/283838731/1067680839.mp4?filename=Cosmos+-+17692.mp4';
    return (
        <Container fluid className="p-0">
            <Navigation />
            <Header headline="Insightful data at a glance" title="Data Visualizer">
                <br></br>
                <br></br>
            </Header>
            <div
                style={{
                    background: 'linear-gradient(rgba(33, 33, 33, 1.0), rgba(24, 24, 40, 0.7)',
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
                    <CenterPiece>
                        <Button color="light" outline size="large" onClick={() => getAllCountries()}>
                            Let's go
                        </Button>
                    </CenterPiece>
                </Container>
            </div>
        </Container>
    );
};

export default HomePage;
