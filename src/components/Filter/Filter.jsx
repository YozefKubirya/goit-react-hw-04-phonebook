import { nanoid } from "nanoid";
import React from "react";
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  const filterID = nanoid();
  return <>
    <label htmlFor={filterID}>Find contac by name
      <input
        type="text"
        value={value}
        name="filter"
        onChange={onChange}
        id={filterID}
      />
    </label>
  </>
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}