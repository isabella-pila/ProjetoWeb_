import { createGlobalStyle } from 'styled-components'

export const colors = {
    primary: "#005730",
    black: "#000",
    white: "#fff",
    background: '#D8FFD4',
    text: '#002F1A',
    box: '#F4F3F3',
    boxtext: '#D9D9D9',
    error: "#e74c3c",
    errorDark: "#c0392b",
    errorLight: "#fadbd8",
    
}

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-family: Itim;
    }
    body {
        color: ${colors.text};
        background-color: ${colors.background};
    }
    `