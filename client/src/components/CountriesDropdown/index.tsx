import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import ICountry from '../../model/country';
import { IQueryParam } from '../../pages/select';

export interface ICountriesDropdown {
    selectedCountry: string;
    countries: ICountry[];
    setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
    thisParam: IQueryParam;
}

const CountriesDropdown: React.FunctionComponent<ICountriesDropdown> = (props) => {
    const { selectedCountry, countries, setSelectedCountry, thisParam } = props;

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
                            setSelectedCountry(country.name);
                            thisParam.countryName = country.name;
                            thisParam.countryCode = country.code;
                        }}
                    >
                        {country.name}
                    </Dropdown.Item>
                );
            });
        }
    }
    return (
        <DropdownButton drop="end" variant="dark" title={selectedCountry}>
            {displayCountriesList()}
        </DropdownButton>
    );
};

export default CountriesDropdown;
