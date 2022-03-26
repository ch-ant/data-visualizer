import React, { useState } from 'react';
import { ButtonGroup, Card, Collapse } from 'react-bootstrap';
import { Button, CardBody } from 'reactstrap';

export interface IBasicTransition {}

const BasicTransition: React.FunctionComponent<IBasicTransition> = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="d-flex justify-content-center">
            <Collapse in={!open}>
                {/* <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                    click
                </Button> */}
                <ButtonGroup aria-label="outlined primary button group">
                    <Button onClick={() => setOpen(!open)}>Line Chart</Button>
                    <Button>Bar Chart</Button>
                    <Button>Scatter Plot</Button>
                </ButtonGroup>
            </Collapse>
            <br></br>
            <Collapse in={open}>
                <Card>
                    <CardBody>
                        <div id="example-collapse-text">
                            Anim pariatur cliche reprehenderit, enim eiusmod high <br></br> life accusamus terry richardson ad squid. <br></br>Nihil anim keffiyeh helvetica, craft beer <br></br>labore
                            wes anderson cred nesciunt sapiente ea proident.
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};

export default BasicTransition;
