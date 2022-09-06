import styled from "styled-components";
import { Form } from "../common/Form";

export default function Login() {
  return (
    <main>
      <Title>MyWallet</Title>
      <Form>
        <input placeholder="E-mail" type="email" name="email" required />
        <input placeholder="Senha" type="password" name="password" required />
        <button>Entrar</button>
      </Form>
      <Span>Primeira vez? Cadastre-se!</Span>
    </main>
  );
}

const Title = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  color: #ffffff;
  margin-top: 25vh;
`;

export const Span = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;
