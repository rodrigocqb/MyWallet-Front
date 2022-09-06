export default function SignUp() {
  return (
    <main>
      <Title>MyWallet</Title>
      <Form>
        <input placeholder="Nome" type="text" name="nome" required />
        <input placeholder="E-mail" type="email" name="email" required />
        <input placeholder="Senha" type="password" name="password" required />
        <input
          placeholder="Confirme a senha"
          type="password"
          name="password"
          required
        />
        <button>Cadastrar</button>
      </Form>
      <Span>Já tem uma conta? Entre agora!</Span>
    </main>
  );
}
