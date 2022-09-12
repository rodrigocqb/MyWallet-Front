import dayjs from "dayjs";
import styled from "styled-components";

export default function UserTransactions({
  id,
  type,
  description,
  value,
  date,
}) {
  return (
    <TransactionWrapper type={type}>
      <div>
        <span>{dayjs(date).format("DD/MM")}</span>
        <h2>{description}</h2>
      </div>
      <p>{value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
    </TransactionWrapper>
  );
}

const TransactionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    color: ${(props) => (props.type === "receipt" ? "#03AC00" : "#C70000")};
  }
  div {
    display: flex;
  }
  span {
    margin-right: 6px;
    color: #c6c6c6;
  }
`;
