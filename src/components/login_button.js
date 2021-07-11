import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Shopping List Web</h5>
        <p className="card-text">Online Shopping List application. Access anywhere!</p>
        <button
          className="btn btn-dark"
          onClick={() => loginWithRedirect()}>Log In with Auth0
        </button>
      </div>
    </div>
  );
};

export default LoginButton;