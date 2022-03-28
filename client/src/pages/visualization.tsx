import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import CenterPiece from '../components/CenterPiece';
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
        logging.debug('visualization received: ', queryParams);

        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/get/measurements`,
                params: {
                    id: 1
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

    if (loading) {
        return <LoadingComponent>Loading chart...</LoadingComponent>;
    }

    return (
        <Container fluid className="p-0">
            <Navigation />
            <CenterPiece>
                <Card className="text-center p-5">
                    <CardBody>
                        <LineChartComponent data={measurements} keys={keys} />
                    </CardBody>
                </Card>
            </CenterPiece>
        </Container>
    );
};

export default Visualization;
