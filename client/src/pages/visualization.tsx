import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Fade } from 'reactstrap';
import Background from '../components/Background';
import Gradient from '../components/Gradient';
import LineChartComponent from '../components/LineChart';
import LoadingComponent from '../components/Loading';
import Navigation from '../components/Navigation';
import config from '../config/config';
import logging from '../config/logging';
import IPageProps from '../interfaces/page';
import IMeasurement from '../model/measurement';

const Visualization: React.FunctionComponent<IPageProps> = (props) => {
    const [measurements, setMeasurements] = useState<IMeasurement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [keys, setKeys] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getMeasurements();
    }, []);

    const getMeasurements = async () => {
        logging.info(`This is just a test api call to: ${config.server.url}/get/measurements`);

        const queryParams = JSON.parse(sessionStorage.queryParams);
        const filterTimeParam = JSON.parse(sessionStorage.filterTimeParam);
        const aggregateTimeParam = sessionStorage.aggregateTimeParam;

        logging.debug('visualization received:', { queryParams, filterTimeParam, aggregateTimeParam });

        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/get/measurements`,
                params: {
                    queryParams: queryParams,
                    filterTimeParam: filterTimeParam
                }
            });

            if (response.status == (200 || 304)) {
                logging.info(`Fetched measurements:`, response.data.results);
                let measurements = response.data.results as IMeasurement[];
                setMeasurements(measurements);

                let keys = Object.keys(measurements[0]) as string[];
                setKeys(keys);
                logging.debug(`Keys: `, keys);
            } else {
                setError(`Unable to retrieve measurements`);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    };

    const visualizeAgainButton = (
        <div className="mt-5 d-flex justify-content-center">
            <Button className="mt-5" color="light" outline tag={Link} to="/select" onClick={() => {}}>
                Visualize Again
            </Button>
        </div>
    );

    const chart = (
        // TODO support multiple chart types
        <div className="mt-5 d-flex justify-content-center ">
            <Card className="text-center p-5 mt-5">
                <LineChartComponent data={measurements} keys={keys} />
            </Card>
        </div>
    );

    if (loading) {
        return <LoadingComponent>Loading chart...</LoadingComponent>;
    }

    return (
        <Container fluid className="p-0">
            <Gradient rgba1={'rgba(33, 33, 33, 1.0)'} rgba2={'rgba(24, 24, 40, 0.8)'} height={'100%'}>
                <Navigation />

                <Background url={''}></Background>
                <Fade>
                    {chart}
                    {visualizeAgainButton}
                </Fade>
            </Gradient>
        </Container>
    );
};

export default Visualization;
