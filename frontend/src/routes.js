import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

// Definindo as rotas dos componentes:
export default function Routes() {
  return(
    // O componente 'Swicth' faz com que apenas uma rotaa seja chamada para cada URL informada pelo usuário.
    <Switch>
      <Route path='/' exact component={Feed} /> {/* O "exact" é usado para comparar exatamente a rota digitada, e não só o começo, que é como o react compara por deafult */}
      <Route path='/new' component={New} />
    </Switch>
  );
}