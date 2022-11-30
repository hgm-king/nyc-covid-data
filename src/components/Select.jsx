import React from "react";
import Select from "react-select";

export default function SelectPrime(props) {
  const { options, onChange, defaultValue } = props;

  const optionsMapped = options.map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <Select
      options={optionsMapped}
      defaultValue={{
        label: defaultValue,
        value: defaultValue,
      }}
      onChange={onChange}
    />
  );
}
