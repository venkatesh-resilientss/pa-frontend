import React, { useState, useEffect } from 'react';
import MultiSelect from 'react-multi-select-component';

const CustomMultiSelect = ({ options, onSelectChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    onSelectChange(selectedOptions);
  }, [selectedOptions, onSelectChange]);

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  const handleSelectAll = () => {
    setSelectedOptions(options);
  };

  const handleDeselectAll = () => {
    setSelectedOptions([]);
  };

  const selectAllOption = { label: 'Select All', value: 'selectAll' };

  return (
    <MultiSelect
      options={[selectAllOption, ...options]}
      value={selectedOptions}
      onChange={handleSelectChange}
      labelledBy="Select"
      hasSelectAll={false} // Disable the default "Select All" option
      disableSearch={true} // Disable search to prevent "Select All" from being filtered out
      overrideStrings={{ selectAll: 'Select All' }}
      className="custom-multi-select"
      isMulti
      {...(selectedOptions.length === options.length ? { disable: ['selectAll'] } : {})}
      {...(selectedOptions.length === 0 ? { enable: ['selectAll'] } : {})}
    />
  );
};

export default CustomMultiSelect;
