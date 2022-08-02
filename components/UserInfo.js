export class UserInfo {
    constructor(userSelectors) {
      this._profileNameSelector = userSelectors.nameSelector
      this._profileJobSelector = userSelectors.jobSelector
      this._profileName = document.querySelector(this._profileNameSelector)
      this._profileJob = document.querySelector(this._profileJobSelector)
    }
  
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        job: this._profileJob.textContent
      };
    }
  
    setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileJob.textContent = data.job;
    }
  
  }