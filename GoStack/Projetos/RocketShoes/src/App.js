import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'; //deixa o store disponivel para os componentes
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './styles/global';
import Header from './components/Header'
import Routes from './routes';

import './config/ReactotronConfig'

//O react-router-dom vai ficar escutando as alterações no historico de navegacao
import history from './services/history';

import store from './store';

function App() {
  return (
    // O Provider vai derixar a store disponivel para os componentes da aplicação
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
