import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        black: '#050505',
        facebook: '#1877f2',
        singInDetailsGrey: '#454245',
        green: '#007a5a',
        white: '#ffffff',
        grey : "#dbdbdb",
        greyMessage: '#f0f2f5',
        boxShadow: '#00000033',
        time: '#65676b',

        google: {
            color : '#4285f4',
            shadow : '#0000004d',
            active: '#dddddd'
        },
        navBar: {
            purple: '#350d36',
            white: "#ffffff",
            black: "#1d1c1d"
        },
        logout: {
            background: '#f8f8f8',
            activeCircle: '#007a5a',
            topBorder: "#dbdbdb",
            blue: '#1264a3',
            white: '#fff'
        }
    },
    fontSizes: {
        big: '48px'
    },
    fontFamily: {
        roboto: 'Roboto, sans-serif'
    }
};

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;