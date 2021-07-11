import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import HttpsRedirect from 'react-https-redirect';
import Login from "./login/Login";
import Main from "./main/Main";

export default function App() {
  return (
    <HttpsRedirect>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        audience={process.env.REACT_APP_BACKEND_URL}
        redirectUri={`${window.location.origin}/app`}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/app:share?">
              <Main />
            </Route>
          </Switch>
        </Router>
      </Auth0Provider>
    </HttpsRedirect>
  );
}
