import React from 'react';
import { Col, Container, Row } from 'reactstrap';

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
        background: 'linear-gradient(rgba(36, 20, 38, 0.4), rgba(36, 39, 38, 0.1)), url(' + image + ') no-repeat center center',
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
                    <video
                        autoPlay
                        loop
                        muted
                        style={{
                            position: 'absolute',
                            width: '100%',
                            left: '50%',
                            top: '50%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: 'translate(-50%, -50%)',
                            zIndex: '-1',
                            overflow: 'hidden'
                        }}
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                    <Col>
                        <h1 className="display-4 text-white mt-5 mb-2">{title}</h1>
                        <h4 className="mb-5 text-white">{headline}</h4>
                        {children}
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

Header.defaultProps = {
    height: '150%',
    video: 'https://vod-progressive.akamaized.net/exp=1648222388~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1767%2F11%2F283838731%2F1067680839.mp4~hmac=8eff77e19e1d2fc77337872abfd2359ab00c3386da1ff54970a859d3697387b5/vimeo-prod-skyfire-std-us/01/1767/11/283838731/1067680839.mp4?filename=Cosmos+-+17692.mp4'
};

export default Header;
