import React from 'react';
import { Col, Container, Fade, Row } from 'reactstrap';

export interface IHeaderProps {
    height?: string;
    image?: string;
    video?: string;
    title: string;
    headline: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const { children, height, image, video, headline, title } = props;

    let headerStyle = {
        background: 'linear-gradient(rgba(36, 20, 38, 0.4), rgba(36, 39, 38, 0.3)), url(' + image + ') no-repeat center center',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: 'height'
    };

    return (
        <header style={headerStyle}>
            <Container>
                <Row className="align-items-center text-center">
                    <Col>
                        <Fade tag="h1">
                            <h1 className="display-4 text-white mt-5 mb-2">{title}</h1>
                            <h4 className="mb-5 text-white">{headline}</h4>
                            {children}
                        </Fade>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

Header.defaultProps = {
    height: '150%',
    video: '../../../src/assets/mp4/bg.mp4'
};

export default Header;
