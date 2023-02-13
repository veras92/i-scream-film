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
const closeAuthBtn = document.querySelector('.auth-backdrop-close');

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
  firebaseContainerEl.classList.remove('display-none');

  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInFailure: function (error) {
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
        return handleUIError(error);
      },
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Query parameter name for mode.
    queryParameterForWidgetMode: 'mode',
    // Query parameter name for sign in success url.
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,

      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in the Sign Up page.
        requireDisplayName: true,
      },
    ],
  });
}

// модальне вікно логіну
btnLoginEl.addEventListener('click', () => {
  backDropEl.classList.remove('logging--is-hiden');
  emailAuthentication();
  window.addEventListener('keydown', onEscKeyPress);
});

closeAuthBtn.addEventListener('click', () => {
  backDropEl.classList.add('logging--is-hiden');
  modalContentEl.classList.remove('display-none');
  modalContentEl.classList.remove('logging--is-hiden');
  firebaseContainerEl.classList.add('display-none');
});

backDropEl.addEventListener('click', onBackdropModalClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  backDropEl.classList.add('logging--is-hiden');
}

function onBackdropModalClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
//
