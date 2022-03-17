import * as FirebaseApp from "firebase/app";
import * as FirebaseAuth from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const firebaseApp = FirebaseApp.initializeApp(firebaseConfig);

// login page auth methods
export function signin(email, password) {
  return FirebaseAuth.signInWithEmailAndPassword(
    FirebaseAuth.getAuth(),
    email,
    password
  );
}

export function signup(email, password) {
  return FirebaseAuth.createUserWithEmailAndPassword(
    FirebaseAuth.getAuth(),
    email,
    password
  );
}

export function resetPassword(email) {
  return FirebaseAuth.sendPasswordResetEmail(FirebaseAuth.getAuth(), email);
}

export function signOut() {
  return FirebaseAuth.signOut(FirebaseAuth.getAuth());
}

// profile exist auth methods
export function updateUserProfile(displayName, photoUrl) {
  return FirebaseAuth.signOut(FirebaseAuth.updateProfile(), {
    displayName,
    photoUrl,
  });
}

export function updateUserEmail(email) {
  return FirebaseAuth.updateEmail(FirebaseAuth.getAuth(), email);
}

export function updateUserPassword(password) {
  return FirebaseAuth.updatePassword(FirebaseAuth.getAuth(), password);
}

export function updateUserPhoneNumber(phoneNumber) {
  return FirebaseAuth.updatePhoneNumber(FirebaseAuth.getAuth(), phoneNumber);
}

// general auth methods

export function getDataUserCurrent() {
  return FirebaseAuth.getAuth().currentUser;
}

export function sendEmailVerification() {
  return FirebaseAuth.sendEmailVerification(FirebaseAuth.getAuth().currentUser);
}

export function userAuthChange(callback) {
  return FirebaseAuth.onAuthStateChanged(FirebaseAuth.getAuth(), (user) => {
    console.log("User changed")
    callback(user);
  });
}

// https://firebase.google.com/docs/auth/admin/errors
export function getMessageError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "The provided value for the email user property is invalid. It must be a string email address";
    case "auth/invalid-email-verified":
      return "The provided value for the emailVerified user property is invalid. It must be a boolean";
    case "auth/email-already-exists":
      return "The provided email is already in use by an existing user. Each user must have a unique email";
    case "auth/email-already-in-use":
      return "Email already in use"
    case "auth/invalid-password":
      return "The provided value for the password user property is invalid. It must be a string with at least six characters";
    case "auth/invalid-photo-url":
      return "The provided value for the photoURL user property is invalid. It must be a string URL";
    case "auth/invalid-phone-number":
      return "The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string"
    case "auth/phone-number-already-exists":
      return "The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber"
    case "auth/invalid-display-name":
      return "The provided value for the displayName user property is invalid. It must be a non-empty string"
    case "auth/user-not-found":
      return "There is no existing user record corresponding to the provided identifier."
    case "auth/wrong-password":
      return "Wrong passoword"
    default:
      return "unknow error";
  }
}
