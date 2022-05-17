import React from 'react';
import { Button, Card, CardText, Container, Fade } from 'reactstrap';
import IPageProps from '../interfaces/page';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import CenterPiece from '../components/CenterPiece';
import Background from '../components/Background';
import { Link } from 'react-router-dom';
import Gradient from '../components/Gradient';

const HomePageText = `
        Data visualizer allows one to visually draw 
        data related conclusions in an instant. No more 
        scratching your head, looking at endless numbers. 
        The currently supported data contains various measurements 
        per year for different indicators for
        the countries of the European Union.`;

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
        <Gradient rgba1={'rgba(33, 33, 33, 0.3)'} rgba2={'rgba(24, 24, 40, 0.5)'} height={'700px'}>
            {homePageContents}
        </Gradient>
    </Container>
);

export default HomePage;
