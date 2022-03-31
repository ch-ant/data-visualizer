import React from 'react';

export interface IGradientRGBA {
    rgba1: string;
    rgba2: string;
    height: string;
}

const Gradient: React.FunctionComponent<IGradientRGBA> = (props) => {
    const { rgba1, rgba2, children, height } = props;

    return (
        <div
            style={{
                background: `linear-gradient(${rgba1}, ${rgba2})`,
                position: 'absolute',
                objectFit: 'fill',
                width: '100%',
                height: height
            }}
        >
            {children}
        </div>
    );
};

export default Gradient;
