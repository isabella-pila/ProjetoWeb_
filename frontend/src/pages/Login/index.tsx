import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/userAuth";
import { Button, Container, ErrorMessage, Form, FormGroup, Input, Label, RegisterLink, Title } from "./styles";
import { Header } from "../../components/Header";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login")
    } finally {
      setIsLoading(false)
    }
  }
  return ( <>
    <Header onSearchChange={() => {}} />
    <Container>
      <Title>Login</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </Form>

      <RegisterLink>
        Não tem uma conta? <Link to="/register">Registrar</Link>
      </RegisterLink>
    </Container>
    </>
  )
}
