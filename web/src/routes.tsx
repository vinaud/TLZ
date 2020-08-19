import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import Reports from './pages/Reports';
import Register from './pages/Register'

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/reports" component={Reports} />
      <Route path="/register" component={Register} />
    </BrowserRouter>
  );
}

export default Routes;