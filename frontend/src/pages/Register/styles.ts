
import styled from "styled-components"
import { colors } from "../../styles/GlobalStyle"

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${colors.text};
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Label = styled.label`
  font-weight: bold;
`

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  font-family: Itim;
`

export const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${colors.boxtext};
    color: ${colors.black}
    
  }
  
  &:disabled {
    background-color: ${colors.primary};
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.div`
  color: ${colors.error};
  background-color: ${colors.errorLight};
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`

export const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: ${colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`