import '../App.css';
import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Header from '../../components/header';
import LoginButton from '../../components/login_button';

function Main() {
  const { isLoading, isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      history.push("/app");
    }
  }, [isLoading, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Header />
      <div className="View">
        <div className="Center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Main;