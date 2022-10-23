class User {
    constructor(UserRepository, OtpRepository, bcrypt, cloudinary) {
      this.UserRepository = UserRepository;
      this.OtpRepository = OtpRepository;
      this.bcrypt = bcrypt;
    }
  
    async getUserExist(username, email) {
      return await this.UserRepository.getUserExist(username, email);
    }
  
    async getProfile(id) {
      let result = {
        isSuccess: false,
        reason: null,
        status: 404,
        data: null,
      };
  
      const user = await this.UserRepository.getUserById(id);
  
      if (user === null) {
        result.reason = "user not found";
        return result;
      }
  
      result.isSuccess = true;
      result.data = user;
      result.status = 200;
  
      return result;
    }
  
    async updateMemberByAdmin(userData, id) {
      let result = {
        isSuccess: false,
        reason: "success",
        status: 404,
        data: null,
      };
      let user = await this.UserRepository.getUserById(id);
      if (user == null) {
        result.reason = "user not found";
        return result;
      }
      user = await this.UserRepository.updateUser(userData, id);
      result.isSuccess = true;
      result.status = 200;
      return result;
    }
  
    async updatePassword(user, id) {
      let result = {
        isSuccess: false,
        reason: "success",
        status: 404,
        data: null,
      };
  
      if (user.newPassword !== user.confirmNewPassword) {
        result.reason = "password not match";
        result.status = 400;
        return result;
      }
  
      let userById = await this.UserRepository.getPrivate(id);
  
      if (userById === null) {
        result.reason = "user not found";
        return result;
      }
      if (this.bcrypt.compareSync(user.newPassword, userById.password) == true) {
        result.reason = "old password and new password can't be the same";
        return result;
      }
      if (!this.bcrypt.compareSync(user.oldPassword, userById.password)) {
        result.reason = "old password not match";
        return result;
      }
      user.password = user.newPassword;
      user.password = this.bcrypt.hashSync(user.password, 10);
  
      await this.UserRepository.updateUser(user, id);
  
      result.isSuccess = true;
      result.status = 200;
      return result;
    }
  
  
    async updateEmail (userData , id ){
      let result = {
        isSuccess : false,
        reason : '',
        status : 400,
      }
      let user = await this.UserRepository.getUserByID(id)
      if(user === null){
        result.reason = "user not found"
        result.status = 404
        return result
      }
      let otp = await this.OtpRepository.getOTP(userData.email , userData.otp_,"UPDATEEMAIL" )
      if(otp === null){
        result.reason = "invalid otp "
        return result
      }
      await this.UserRepository.updateUser(userData, id);
      await this.OtpRepository.deleteAllOtp(userData.email)
  
      result.isSuccess =true
      result.status = 200
      return result
    }
  
  }
  

module.exports = User
