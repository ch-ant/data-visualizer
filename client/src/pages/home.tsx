import React from 'react';
import { Button, Card, CardText, Container, Fade } from 'reactstrap';
import IPageProps from '../interfaces/page';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import CenterPiece from '../components/CenterPiece';
import Background from '../components/Background';
import { Link } from 'react-router-dom';
import Gradient from '../components/Gradient';

const HomePageText = (
    <p>
        The final goal of the project was to implement a data visualization application which utilizes data integrated into a database. The application should be able to be used in order to visually
        draw conclusions regarding the depicted data. The data which populates the database was extracted from The World Bank and it contains various measurements per year for different indicators for
        the countries of the European Union.
    </p>
);

const homePageContents = (
    <Fade>
        <CenterPiece>
            <div
                style={{
                    textAlign: 'center',
                    width: '60%',
                    height: '100%'
                }}
            >
                <Card body>
                    <CardText>{HomePageText}</CardText>
                    <Button tag={Link} to="/select">
                        Let's go
                    </Button>
                </Card>
            </div>
        </CenterPiece>
    </Fade>
);

const HomePage: React.FunctionComponent<IPageProps> = () => (
    <Container fluid className="p-0">
        <Navigation />
        <Background url={''}></Background>
        <Header headline="Insightful data at a glance" title="Data Visualizer"></Header>
        <Gradient rgba1={'rgba(33, 33, 33, 0.3)'} rgba2={'rgba(24, 24, 40, 0.5)'}>
            {homePageContents}
        </Gradient>
    </Container>
);

export default HomePage;
