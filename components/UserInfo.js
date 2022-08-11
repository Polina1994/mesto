export class UserInfo {
    constructor(userInfo) {
      this._profileName = document.querySelector(userInfo.nameSelector);
      this._profileDescription = document.querySelector(userInfo.descriptionSelector);
      this._profileAvatar = document.querySelector(userInfo.profileAvatar);
      this._userId = {}
    }
  
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        about: this._profileDescription.textContent,
        profileAvatar: this._profileAvatar.src,
      };
    }
  
    setUserInfo(data) {
      if (data.name) {
        this._profileName.textContent = data.name;
      }
      if (data.about) {
        this._profileDescription.textContent = data.about;
      }
      if (data.profileAvatar) {
        this._profileAvatar.src = data.profileAvatar;
      }
    }
    setUserId(userId) {
      this.id = userId
    }
  }