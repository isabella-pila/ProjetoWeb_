import styled from "styled-components";
import { colors } from "../../styles/GlobalStyle";

export const Container = styled.div`
  
  margin: 0 auto;
  padding: 2rem;
    justify-items: center;
    background-color: #ffffff;
    border-radius: 2rem;
    box-shadow: 10px 10px 20px #8d8b8b;
    height: auto;
    width: 40vw;
    margin-top: 5%;
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
  border-radius: 10px;
  font-family: Itim;
  width: 30vw;
  background-color: ${colors.boxtext};
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
    background-color: ${colors.box};
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

export const RegisterLink = styled.p`
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