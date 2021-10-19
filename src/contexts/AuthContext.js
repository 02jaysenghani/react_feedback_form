import LocalStorageService from './LocalStorageContext'

const userDataKey = 'userData'
const userLoggedInKey = 'userLoggedIn'
const userEmailKey = 'userEmail'

const AuthService = {
  isUserLoggedIn() {
    return localStorage.getItem(userLoggedInKey) && localStorage.getItem(userLoggedInKey) === 'true' ? true : false
  },

  signup(email, password) {
    const data = { email: email, password: password }

    const userData = LocalStorageService.getData(userDataKey, true);

    if (userData.length) {
      const duplicate = userData.some(x => x.email === email)
      if (duplicate) return true
    }
    userData.push(data);
    LocalStorageService.saveData(userDataKey, userData, true)
    return false
  },

  login(email, password) {
    const userData = LocalStorageService.getData(userDataKey, true);
    let searchUser = false;
    if (userData.length) {
      searchUser = userData.some(x => x.email === email && x.password === password);
    }

    if (searchUser) {
      LocalStorageService.saveData(userEmailKey, email)
      LocalStorageService.saveData(userLoggedInKey, true)
    }
    return searchUser
  },

  signout() {
    LocalStorageService.deleteData(userLoggedInKey);
  }
};

export default AuthService;