import { useState } from 'react';
import { Button, Container, Fade, Input } from 'reactstrap';
import IIndicator from '../../model/indicator';

export interface ISearchProps {
    indicators: IIndicator[];
}

const getFilteredItems = (text: string, items: any[]) => {
    if (!text) {
        return [];
    }
    return items.filter((song: { name: string | any[] }) => song.name.includes(text));
};

const SearchBar: React.FunctionComponent<ISearchProps> = (props) => {
    let { indicators } = props;

    const [text, setText] = useState('');
    // items looks like this: [{name: 'name1'}, {name: 'name2'}]

    const filteredItems = getFilteredItems(text, indicators);

    return (
        <Container className="mt-4">
            <label>Indicator</label>
            <Input type="text" onChange={(e) => setText(e.target.value)} />
            <ul className="mt-1 p-2">
                {filteredItems.map((value: any) => (
                    <Fade>
                        <Button className="mt-2 p-2 d-flex justify-content-center" key={value.name}>
                            {value.name}
                        </Button>
                    </Fade>
                ))}
            </ul>
        </Container>
    );
};

export default SearchBar;
