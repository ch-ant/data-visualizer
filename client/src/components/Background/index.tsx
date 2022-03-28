import React from 'react';
import backgroundVideo from '../../assets/mp4/bg.mp4';

export interface IBackground {
    url: string;
}

const Background: React.FunctionComponent<IBackground> = (props) => {
    let { url } = props;

    if (url === '') {
        url = backgroundVideo;
    }

    return (
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
            <source src={url} type="video/mp4" />
        </video>
    );
};

Background.defaultProps = {
    url: backgroundVideo
};

export default Background;
