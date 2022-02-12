import { useEffect, useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  align-items: flex-stretch;
  background-color: rgba(43, 47, 54, 0.9);
  border-radius: 4px;
  box-sizing: border-box;
  color: rgb(222 236 233);
  display: flex;
  height: 40px;
  line-height: 40px;
  margin: 16px 0px 8px;
  min-width: 0px;
  overflow: hidden;
  padding: 0 16px;
  width: 100%;

  > label {
    width: fit-content;
  }

  > input {
    background: inherit;
    border: none;
    color: inherit;
    flex-grow: 2;
    font-size: 14px;
    height: 100%;
    outline: none;
    padding-left: 4px;
    padding-right: 4px;
    text-align: right;
    width: 100%;
  }
`;

export function Input({ value, label, name, asset, disabled = false }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleOnlyNumber = (event) => {
    const { value } = event.target;
    if (isNaN(value)) {
      event.target.value = inputValue;
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <InputWrapper>
      <label htmlFor={`${name}-${label}`}>{label}</label>
      <input
        type="text"
        autoComplete="off"
        id={`${name}-${label}`}
        name={name}
        disabled={disabled}
        value={inputValue}
        onInput={handleOnlyNumber}
        onChange={handleInputChange}
      />
      <span>{asset}</span>
    </InputWrapper>
  );
}
