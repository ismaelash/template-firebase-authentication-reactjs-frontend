import logoReact from "./logo.svg";
import logoFirebaseAuth from "./authentication.svg";
import "./App.css";
import { useState } from "react";
import * as FirebaseController from "./components/firebaseController";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogged, setUserLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onButtonSigninClicked() {
    setErrorMessage("");
    try {
      await FirebaseController.signin(email, password);
      setUserLogged(true);
      alert("User logged");
      console.log("user data", FirebaseController.getDataUserCurrent());
    } catch (error) {
      setErrorMessage(FirebaseController.getMessageError(error.code));
      console.error("onButtonSigninClicked", JSON.stringify(error));
    }
  }

  async function onButtonSignupClicked() {
    setErrorMessage("");
    try {
      await FirebaseController.signup(email, password);
      alert("User signup");
    } catch (error) {
      setErrorMessage(FirebaseController.getMessageError(error.code));
      console.error("onButtonSignupClicked", JSON.stringify(error));
    }
  }

  async function onButtonResetPasswordClicked() {
    setErrorMessage("");
    try {
      await FirebaseController.resetPassword(email, password);
      alert("Sended email for reset password");
    } catch (error) {
      setErrorMessage(FirebaseController.getMessageError(error.code));
      console.error("onButtonResetPasswordClicked", JSON.stringify(error));
    }
  }

  async function onButtonSignoutClicked() {
    setErrorMessage("");
    try {
      await FirebaseController.signOut();
      setUserLogged(false);
    } catch (error) {
      setErrorMessage(FirebaseController.getMessageError(error.code));
      console.error("onButtonSignoutClicked", JSON.stringify(error));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logoReact} className="App-logo" alt="logo" />
          <img src={logoFirebaseAuth} className="App-logo" alt="logo" />
        </div>
        {!userLogged && (
          <div>
            <p>Email:</p>
            <input
              type="email"
              placeholder="email"
              required="true"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <p>Password:</p>
            <input
              type="password"
              placeholder="password"
              required="true"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <div className="buttons">
              <button onClick={onButtonSigninClicked}>Sign in</button>
              <button onClick={onButtonSignupClicked}>Sign up</button>
              <button onClick={onButtonResetPasswordClicked}>
                Reset password
              </button>
            </div>
          </div>
        )}
        {userLogged && (
          <div>
            <span>Content only for user with auth on system</span>
            <br />
            <span>
              User infos: {FirebaseController.getDataUserCurrent()?.email}
            </span>
            <br />
            <button onClick={onButtonSignoutClicked}>Sign out</button>
          </div>
        )}
        {errorMessage && <p>Error: {errorMessage}</p>}
      </header>
    </div>
  );
}

export default App;
