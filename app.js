import {
  Token
} from 'utils/token';
import {
  UserModel
} from 'utils/user';

App({
  onLaunch: function() {
    // var user = new UserModel();
    // user.getUser();
    var token = new Token();
    token.verify();
  }
})