class AuthUC {
    constructor(
      AuthRepository,
      UserRepository,
      bcrypt,
      generateAccessToken,
      _
     
    ) {
      this.AuthRepository = AuthRepository;
      this.UserRepository = UserRepository;
      this.bcrypt = bcrypt
      this.generateToken = generateAccessToken
      this._ = _
    }
  
    async register(userData) {
      let result = {
        isSuccess: false,
        reason: "",
        status: 404,
        data: null,
        token: null,
      };
  
     
      let user = await this.UserRepository.getUserByUsernameAndEmail(
        userData.username,
        userData.email
      );
      if (userData.password !== userData.confrimPassword) {
        result.reason = "password and confrim password not match";
        return result;
      }
      if (user !== null) {
        result.reason = "username or email not aviable";
        return result;
      }
  
      userData.password = this.bcrypt.hashSync(userData.password, 10);
  
      if (userData.image !== this.defaultImage.DEFAULT_AVATAR) {
        let image = await this.cloudinary.uploadCloudinaryAvatar(userData.image);
        userData.image = image;
        user = await this.AuthRepository.registerUser(userData);
      } else {
        user = await this.AuthRepository.registerUser(userData);
      }
      let dataUser = this._.omit(user.dataValues, ["password"]);
      let token = this.generateToken(dataUser);
  
      await this.OtpRepository.deleteAllOtp(userData.email);
      result.isSuccess = true;
      result.status = 200;
      result.data = dataUser;
      result.token = token;
      return result;
    }
  
    async login(username, password) {
      let result = {
        isSuccess: false,
        reason: "",
        status: 404,
        data: null,
        token: null,
      };
  
      let user = await this.AuthRepository.loginUser(username);
      if (user == null) {
        result.reason = "incorect email or password";
        return result;
      }
      if (!this.bcrypt.compareSync(password, user.password)) {
        result.reason = "incorect email or password";
        return result;
      }
      let dataUser = this._.omit(user.dataValues, ["password"]);
      let token = this.generateToken(dataUser);
      result.isSuccess = true;
      result.status = 200;
      result.data = dataUser;
      result.token = token;
      return result;
    }
    async loginGoogle(idToken) {
      let result = {
        isSuccess: false,
        reason: "",
        status: 404,
        data: null,
        token: null,
      };
      let data = await this.googleOauth(idToken);
      let user = await this.AuthRepository.loginWithGoogle(data.email);
      if (user == null) {
        const userData = {
          name: data.name,
          username: data.given_name + this.func.generateRandomNumber(3),
          image: this.defaultImage.DEFAULT_AVATAR,
          email: data.email,
          is_admin: false,
        };
        user = await this.AuthRepository.registerUser(userData);
       
      }
      let dataUser = this._.omit(user.dataValues, ["password"]);
      let token = this.generateToken(dataUser);
  
      result.isSuccess = true;
      result.status = 200;
      result.data = user;
      result.data = dataUser;
      result.token = token;
      return result;
    }
  }
  module.exports = AuthUC;
  