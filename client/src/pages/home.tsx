import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import LoadingComponent from '../components/Loading';
import config from '../config/config';
import logging from '../config/logging';
import ICountry from '../model/country';
import IPageProps from '../interfaces/page';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    logging.info('NAMESPACE', `This is just a test api call to: ${config.server.url}/get/countries`);

    const [countries, setCountries] = useState<ICountry[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllCountries();
    }, []);

    const getAllCountries = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/get/countries`
            });

            if (response.status == (200 || 304)) {
                logging.info('NAMESPACE', `Fetched countries:`, response.data);
                let countries = response.data.countries as ICountry[];
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
        // TODO
        // return page containing the countries
        <Container fluid className="p-0">
            {/* <Navigation />
            <Header headline="Check out all the available countries" title="They will eventually get visualized!" /> */}
            <Container className="mt-5">
                {countries?.length === 0 && <p>There are no countries in the database. Sorry! 😢😢😢</p>}
                {countries?.map((country, index) => {
                    return <div key={index}></div>;
                })}
            </Container>
        </Container>
    );
};

export default HomePage;
