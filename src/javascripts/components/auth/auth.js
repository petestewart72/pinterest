import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const createLoginButton = () => {
  const domString = `
  <div class="login-window">
    <button id="google-auth" class="btn btn-warning">
    <i class="fab fa-google"></i> Sign In</button>
  </div>`;
  utils.printToDom('#auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { createLoginButton };
