import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import './i18n'

import LanguageSelector from './components/LanguageSelector';
import SignUp from './containers/SignUp/SignUp';
import ThankYou from './containers/ThankYou';

function App() {

  return (
    <div className="App">
      <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/thanks" component={ThankYou} />
          <Redirect to="/signup" />
        </Switch>
      </Router>
        <LanguageSelector />
      </Suspense>
    </div>
  );
}

export default App;
