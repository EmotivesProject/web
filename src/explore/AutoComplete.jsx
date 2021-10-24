import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import randomKey from '../utils/randomKey';

const AutoComplete = ({ panTo, currentPos }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => currentPos.lat, lng: () => currentPos.lng },
      radius: 100 * 1000, // 100m * 1000 = 100km
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    panTo({ lat, lng });
  };

  const searchLabel = 'Search ';

  return (
    <div id="autocomplete-search">
      <Combobox onSelect={handleSelect}>
        <label htmlFor="ExploreComboBox">
          {searchLabel}
          <ComboboxInput
            id="ExploreComboBox"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Explore a place"
            aria-haspopup
          />
        </label>
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK'
              && data.map(({ description }) => (
                <ComboboxOption key={randomKey()} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default AutoComplete;
