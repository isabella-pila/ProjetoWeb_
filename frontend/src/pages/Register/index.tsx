import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Button, Container, ErrorMessage, Form, FormGroup, Input, Label, LoginLink, Title } from "./styles"
import { Header } from "../../components/Header"

export const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) return

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await register(name, email, password)
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao registrar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    
        <Header onSearchChange={() => {}} />
      <Container>
        <Title>Registrar</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </FormGroup>

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

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirma Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar"}
          </Button>
        </Form>

        <LoginLink>
          Já tem uma conta? <Link to="/login">Login</Link>
        </LoginLink>
      </Container>
    </>
  )
}

