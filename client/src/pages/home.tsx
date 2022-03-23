import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import LoadingComponent from '../components/Loading';
import config from '../config/config';
import logging from '../config/logging';
import ICountry from '../model/country';
import IPageProps from '../interfaces/page';
import CountryPreview from '../components/CountryPreview';

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
                url: `${config.server.url}/get/countries`
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
            {/* <Navigation /> */}
            {/* <Header headline="Check out all the available countries" title="They will eventually get visualized!" /> */}
            <Container className="mt-5">
                {countries.length === 0 && (
                    <p>
                        There are no countries in the database.<br></br> Sorry! 😢
                    </p>
                )}
                {countries.map((country, index) => {
                    return (
                        <div key={index}>
                            <CountryPreview id={country.id} name={country.name} code={country.code} region={country.region} income_group={country.income_group} special_notes={country.special_notes} />
                            <hr />
                        </div>
                    );
                })}
            </Container>
        </Container>
    );
};

export default HomePage;
