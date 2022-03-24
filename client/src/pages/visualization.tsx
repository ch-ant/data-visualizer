import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import CenterPiece from '../components/CenterPiece';
import LineChartComponent from '../components/LineChart';
import LoadingComponent from '../components/Loading';
import logging from '../config/logging';
import IPageProps from '../interfaces/page';

// Dummy data for demo
// Should be deleted at some point
const data = [
    {
        name: 'A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: 'B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: 'C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: 'D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: 'E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: 'F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: 'G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

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
                        <LineChartComponent data={data} />
                    </CardBody>
                </Card>
            </CenterPiece>
        </Container>
    );
};

export default Visualization;
