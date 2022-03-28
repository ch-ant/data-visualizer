import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ICountry from '../../model/country';
import { IQueryParam } from '../../pages/select';

export interface ICountriesDropdown {
    selectedCountry: string;
    countries: ICountry[];
    setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
    queryParam: IQueryParam;
}

const CountriesDropdown: React.FunctionComponent<ICountriesDropdown> = (props) => {
    const { selectedCountry, countries, setSelectedCountry, queryParam } = props;
    const scrollable: React.CSSProperties = { maxHeight: '300px', overflowY: 'scroll', margin: 0 };

    function displayCountriesList() {
        if (countries.length === 0) {
            return (
                <p className="p-4">
                    There are no countries in the database.<br></br> Sorry! 😢
                </p>
            );
        } else {
            return countries.map((country, index) => {
                return (
                    <Dropdown.Item
                        key={index}
                        onClick={() => {
                            selectCountry(country);
                        }}
                    >
                        {country.name}
                    </Dropdown.Item>
                );
            });
        }

        function selectCountry(country: ICountry) {
            setSelectedCountry(country.name);
            queryParam.countryId = country.id;
            queryParam.countryName = country.name;
            queryParam.countryCode = country.code;
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {selectedCountry}
            </Dropdown.Toggle>
            <Dropdown.Menu style={scrollable}>{displayCountriesList()}</Dropdown.Menu>
        </Dropdown>
    );
};

export default CountriesDropdown;
