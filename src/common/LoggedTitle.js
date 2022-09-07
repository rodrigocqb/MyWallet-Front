import styled from "styled-components";

export const LoggedTitle = styled.div`
  width: 100%;
  font-size: 26px;
  font-weight: 700;
  margin-top: 26px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.transaction ? "18px" : "0")};
  img {
    width: 23px;
    height: 24px;
  }
`;
