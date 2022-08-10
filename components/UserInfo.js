export class UserInfo {
    constructor(userInfo) {
      this._profileName = document.querySelector(userInfo.nameSelector);
      this._profileDescription = document.querySelector(userInfo.descriptionSelector);
      this._profileAvatar = document.querySelector(userInfo.profileAvatar);
      this._myId = null
    }
  
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        about: this._profileDescription.textContent,
        profileAvatar: this._profileAvatar.src,
        myId: this._myId
      };
    }
  
    setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileDescription.textContent = data.about;
      this._profileId = data.profileId;
      this._profileAvatar.src = data.profileAvatar;
      this._id = data.myId
    }
    getId() {
      return this._id
    }
  }