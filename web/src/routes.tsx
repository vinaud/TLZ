import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import Reports from './pages/Reports';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/reports" component={Reports} />
    </BrowserRouter>
  );
}

export default Routes;