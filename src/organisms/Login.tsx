import { useState } from "react";
import { fetchLogin } from "../utils/auth";
import Box from "../components/Box";
import { Label } from "../components/Label";
import { Form } from "../components/Form";
import { ErrorLabel } from "../components/ErrorLabel";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { colors } from "../styles/colors";
import { addLog } from "../utils/logs";

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fetchLogin(email, password)) {
      onLogin();
      addLog(`Usuário logado: ${email}`);
    } else {
      setError("E-mail ou senha inválidos");
      addLog(`Erro no login`);
    }
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Box flex justifyContent="center">
          <Label weight={500} color={colors.fluorescentGreen} size="24px">
            Login
          </Label>
        </Box>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
        {error && <ErrorLabel>{error}</ErrorLabel>}
      </Form>
    </Box>
  );
};
