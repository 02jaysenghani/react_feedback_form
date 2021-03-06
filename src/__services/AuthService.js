import LocalStorageService from './LocalStorageService'

const userDataKey = 'userData'
const userKey = 'user'

const AuthService = {
  signup(email, password) {
    const data = { email: email, password: password }

    const userData = LocalStorageService.getData(userDataKey, true);
    let signup_success = true;
    if (userData.length) {
      const duplicate = userData.some(x => x.email === email)
      if (duplicate) return signup_success = false
    }
    userData.push(data);
    LocalStorageService.saveData(userDataKey, userData, true)
    return signup_success
  },

  signin(email, password) {
    const userData = LocalStorageService.getData(userDataKey, true);
    let isUserFound = false;
    if (userData.length) {
      isUserFound = userData.some(x => x.email === email && x.password === password);
    }

    if (isUserFound) {
      const userObj = {
        loggedIn: true,
        user: {
          email: email
        }
      }
      LocalStorageService.saveData(userKey, JSON.stringify(userObj))
    }
    return isUserFound
  },

  signout() {
    LocalStorageService.deleteData(userKey);
  }
};

export default AuthService;