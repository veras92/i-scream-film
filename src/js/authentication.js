import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebase/compat/auth';
import 'firebaseui/dist/firebaseui.css';
import { app } from './firebase-config';

const firebaseContainerEl = document.querySelector(
  '.firebaseui-auth-container'
);
const backDropEl = document.querySelector('.backdrop-login');
const modalContentEl = document.querySelector('.login-modal__content');
const btnEmailEl = document.querySelector('.login-modal__email');
const btnGoogleEl = document.querySelector('.login-modal__google');
const btnLoginEl = document.querySelector('.js-login-btn');
const linkLibraryEl = document.querySelector('.js-header-library');

// перевірка на вхід(авторизован користувач чи ні)
window.addEventListener('load', () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //   User is signed in
      btnLoginEl.classList.add('logging--is-hiden');
      linkLibraryEl.classList.remove('logging--is-hiden');
    } else {
      //   User is not signed in.
      btnLoginEl.classList.remove('logging--is-hiden');
    }
  });
});

btnLoginEl.addEventListener('click', () => {
  backDropEl.classList.remove('logging--is-hiden');
});
btnGoogleEl.addEventListener('click', googleAuthentication);
btnEmailEl.addEventListener('click', emailAuthentication);

//авторизація через гугл

function googleAuthentication() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      backDropEl.classList.add('logging--is-hiden');
      btnLoginEl.classList.add('logging--is-hiden');
      linkLibraryEl.classList.remove('logging--is-hiden');
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// авторизація через пошту
const ui = new firebaseui.auth.AuthUI(firebase.auth());
function emailAuthentication() {
  modalContentEl.classList.add('logging--is-hiden');
  firebaseContainerEl.classList.remove('logging--is-hiden');

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
    ],

    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        backDropEl.classList.add('logging--is-hiden');
        btnLoginEl.classList.add('logging--is-hiden');
        linkLibraryEl.classList.remove('logging--is-hiden');
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      // Other config options...
    },
  });
}

//  ================== figatix

const closeAuthBtn = document.querySelector('.auth-backdrop-close');

closeAuthBtn.addEventListener('click', () => {
  backDropEl.classList.add('logging--is-hiden');
  modalContentEl.classList.remove('display-none');
  modalContentEl.classList.remove('logging--is-hiden');
  firebaseContainerEl.classList.add('display-none');
});

// ================== figatix
