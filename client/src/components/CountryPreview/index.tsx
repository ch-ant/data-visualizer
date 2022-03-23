import React from 'react';
import { Card, CardBody } from 'reactstrap';

export interface ICountryPreviewProps {
    id: bigint;
    name: string;
    code: string;
    region?: string;
    income_group?: string;
    special_notes?: string;
}

const CountryPreview: React.FunctionComponent<ICountryPreviewProps> = (props) => {
    const { id, children, name, code, region, income_group, special_notes } = props;

    return (
        <Card className="border-0">
            <CardBody className="p-5">
                <h3>
                    {name} - {code}
                </h3>
                {!region || region.length === 0 || <p>Region: {region}</p>}
                {!income_group || income_group.length === 0 || <p>Income Group: {income_group}</p>}
                {!special_notes || special_notes.length === 0 || <p>Special Notes: {special_notes}</p>}
                <br />
                {children}
            </CardBody>
        </Card>
    );
};

export default CountryPreview;
