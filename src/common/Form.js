import styled from "styled-components";

export const Form = styled.form`
  margin-top: 25px;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 13px;
  width: 100%;

  input {
    width: 100%;
    max-width: 400px;
    height: 58px;
    background-color: #ffffff;
    border-radius: 5px;
    outline: none;
    font-size: 20px;
    padding-left: 15px;
    color: #000000;
    border: 0px;
    font-weight: 400;
    &::placeholder {
      color: #000000;
    }
  }

  button {
    width: 100%;
    max-width: 400px;
    height: 46px;
    background-color: #a328d6;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    border: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
