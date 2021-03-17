import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState({})
  const provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var gitProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  }
  const handleFaceBookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log("fb User", user);
        setUser(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }
  const handleGitHubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log("Git", user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("error",errorCode, errorMessage, email);
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using Google</button>
      <br />
      <button onClick={handleFaceBookSignIn}>Sign in using FaceBook</button>
      <br />
      <button onClick={handleGitHubSignIn}>Sign in using GitHub</button>
      <h1>Name: {user.displayName}</h1>
      <h3>Email : {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
