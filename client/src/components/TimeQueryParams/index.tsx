import React, { useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { Button, ButtonGroup, Input, Row } from 'reactstrap';

export interface ITimeQueryParams {}

const TimeQueryParams: React.FunctionComponent<ITimeQueryParams> = (props) => {
    const [filterTimeSelected, setFilterTimeSelected] = useState(false);
    const [aggregateTimeSelected, setAggregateTimeSelected] = useState(false);
    const [from, setFrom] = useState<string>('1960');
    const [to, setTo] = useState<string>('2020');

    const fromInput = (
        <>
            From:
            <Input
                type="number"
                placeholder="1960"
                style={{ margin: '5px' }}
                value={from}
                onChange={(e) => {
                    setFrom(e.target.value);
                }}
            ></Input>
        </>
    );

    const toInput = (
        <>
            To:
            <Input
                type="number"
                placeholder="2020"
                style={{ margin: '5px' }}
                value={to}
                onChange={(e) => {
                    setTo(e.target.value);
                }}
            ></Input>
        </>
    );

    const confirmButton = (
        <Button className="ml-4  mr-4 mt-4 d-flex justify-content-center" onClick={() => setFilterTimeSelected(!filterTimeSelected)} size="sm" outline color="light">
            Confirm
        </Button>
    );

    const cancelButton = (
        <Button className="ml-4  mr-4 mt-4 d-flex justify-content-center" onClick={() => setFilterTimeSelected(!filterTimeSelected)} size="sm" outline color="light">
            Cancel
        </Button>
    );

    const filterTimeParams = (
        <Collapse in={filterTimeSelected} className="ml-2">
            <Card className="p-4">
                {fromInput}
                {toInput}
                <Row>
                    {confirmButton}
                    {cancelButton}
                </Row>
            </Card>
        </Collapse>
    );

    const filterTimeButton = (
        <Button onClick={() => setFilterTimeSelected(!filterTimeSelected)} aria-controls="example-collapse-text" aria-expanded={filterTimeSelected} size="sm">
            Filter time
        </Button>
    );

    const aggregateTimeButton = (
        <Button onClick={() => setAggregateTimeSelected(!aggregateTimeSelected)} aria-controls="example-collapse-text" aria-expanded={aggregateTimeSelected} size="sm">
            Aggregate time
        </Button>
    );

    const filterOrAggregateSelectionButtonGroup = (
        <div>
            <ButtonGroup>
                {filterTimeButton}
                {aggregateTimeButton}
            </ButtonGroup>
        </div>
    );

    const aggregateTimeParams = (
        <Collapse in={aggregateTimeSelected}>
            <Card>TODO: Aggregate Time Selected</Card>
        </Collapse>
    );

    return (
        <div style={{ margin: '45px' }} className="d-flex justify-content-center">
            <Collapse in={!filterTimeSelected}>{filterOrAggregateSelectionButtonGroup}</Collapse>
            {filterTimeParams}
            {aggregateTimeParams}
        </div>
    );
};

export default TimeQueryParams;
