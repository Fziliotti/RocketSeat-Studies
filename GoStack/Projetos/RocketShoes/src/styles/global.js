import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import background from '../assets/images/background.svg';

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

  *, *::after, *::before{
    margin:0;
    padding:0;
    outline:none;
    box-sizing:border-box;
  }

  body{
    background: #191920 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body,input,button{
    font: 14px Roboto, sans-serif;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background: #3A3A3A;
  }

  ::-webkit-scrollbar-thumb {
    background: #f1f1f1;
    border-radius: 2px;
  }

  #root{
    max-width:1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button{
    cursor:pointer;
  }

`
