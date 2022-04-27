import React from 'react';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from '../views/home';
import consultaLancamentos from '../views/lancamentos/consultaLancamentos';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
        <Route
          path="/consulta-lancamentos"
          component={consultaLancamentos}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
