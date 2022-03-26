import React from 'react';

export interface IGradientRGBA {
    rgba1: string;
    rgba2: string;
}

const Gradient: React.FunctionComponent<IGradientRGBA> = (props) => {
    const { rgba1, rgba2, children } = props;

    return (
        <div
            style={{
                background: `linear-gradient(${rgba1}, ${rgba2})`,
                position: 'absolute',
                objectFit: 'fill',
                width: '100%',
                height: '700px'
            }}
        >
            {children}
        </div>
    );
};

export default Gradient;
