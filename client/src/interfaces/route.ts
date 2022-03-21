import IPageProps from './page';

export default interface IRoute {
    path: string;
    element: JSX.Element;
    children?: IRoute[];
}
