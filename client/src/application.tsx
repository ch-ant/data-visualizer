import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './config/routes';

export interface IApplicationProps {}

const Application: React.FC = (): JSX.Element => {
    const routing = useRoutes(routes);

    return <>{routing}</>;
};

// Alternative. Not sure which one is better

// const Application: React.FunctionComponent<IApplicationProps> = (props) => {
//     const routing = useRoutes(routes);

//     return <>{routing}</>;
// };

export default Application;
