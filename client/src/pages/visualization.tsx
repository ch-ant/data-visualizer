import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import CenterPiece from '../components/CenterPiece';
import LineChartComponent from '../components/LineChart';
import LoadingComponent from '../components/Loading';
import logging from '../config/logging';
import IPageProps from '../interfaces/page';

const Visualization: React.FunctionComponent<IPageProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        logging.info('This is a demo visualization');
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return <LoadingComponent>Loading chart...</LoadingComponent>;
    }

    return (
        <Container fluid className="p-0">
            <CenterPiece>
                <Card className="text-center p-5">
                    <CardBody>
                        <LineChartComponent />
                    </CardBody>
                </Card>
            </CenterPiece>
        </Container>
    );
};

export default Visualization;
