const email_message = {
  VERIFY_REGISTRATION: {
    text_value: "menunggu vertifikasi user baru: {username}",
    html_value: "<b>menunggu vertifikasi user baru: {username} </b>",
  },
  NOTIF_REGISTRATION: {
    text_value: "vertifikasi user baru: {username}",
    html_value: "<b>vertifikasi user baru: {username} </b>",
  },
  NOTIF_APPROVED_REGISTER: {
    text_value: "your account has beem actived: {username}",
    html_value: "<b>your account has beem actived: {username} </b>",
  },
  UPDATEEMAIL: {
    text_value: "your otp code for update email: {otp}",
    html_value: "<b>your otp code for update email: {otp}</b>",
  },
  RESETPASSWORD: {
    text_value: "your otp code for reset password: {otp}",
    html_value: "<b>your otp code for reset password: {otp}</b>",
  },
  
};
module.exports = email_message;
