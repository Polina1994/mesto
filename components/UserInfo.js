export class UserInfo {
    constructor(userInfoConst) {
      this._profileNameSelector = userInfoConst.nameSelector
      this._profileJobSelector = userInfoConst.jobSelector
      this._profileName = document.querySelector(this._profileNameSelector)
      this._profileJob = document.querySelector(this._profileJobSelector)
    }
  
    getUserInfo() {
      return {
        'user-name': this._profileName.textContent,
        'user-job': this._profileJob.textContent
      };
    }
  
    setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileJob.textContent = data.job;
    }
  
  }