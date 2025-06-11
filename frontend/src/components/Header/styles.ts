import styled from "styled-components";
import { colors } from "../../styles/GlobalStyle";

export const SHeader = styled.header`
  background-color: ${colors.background} ;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: 0.2rem solid ${colors.primary} ;
  height: 6rem;
  margin-bottom: 0.3rem;

   input#menu {
    display: none;
  }

  div{
   align-items: center;
   display: flex;

   img{
   background-color: transparent;
   height: 10vh;
   width: auto;
   margin-left: 0.5rem;
   margin-right: 0.5rem;

   }
  }

 nav{
  div{ 
  form {
   background-color: ${colors.white};
   border-radius: 1rem;
   display: flex;
   align-items: center;
   margin: 1rem;

   input {
   background-color: transparent;
   font-size: 1rem;
   border:var(--white);
   margin-left: 1rem;
   border-radius: 1rem;
   }

  }
   a {
   text-decoration: none;
   font-size: 1.5rem;
   color: inherit;
   margin-right: 1rem;
}
 }
}

@media (max-width: 560px) {
  
    nav {
      div {
        display: none;
      }

      label {
        margin-left: 0.5rem;
        border: 0.18rem solid ${colors.black};
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;

        span {
          border: 0.1rem solid ${colors.black};
          width: 1.6rem;
          height: 0.1rem;

          &:first-child {
            margin-top: 0.2rem;
          }

          &:last-child {
            margin-bottom: 0.2rem;
          }
        }
      }
    }

    input:checked ~ nav {
      div {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 3.1rem;
        right: 0.5rem;
        
        border-radius: 1rem;
        background-color: ${colors.primary};
        color: ${colors.white};
        
      }
    }
  }

`;