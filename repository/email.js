const nodemailer_transport = require("../libs/nodemailer");
const email_message = require("../internal/constant/email_message");
class EmailRepository {
  constructor() {}
  async sendEmail(subject, recipient, text, html) {
    await nodemailer_transport.sendMail({
      from: `"${process.env.MAILER_SENDER_NAME}" <${process.env.MAILER_SENDER_EMAIL}>`,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    });
  }

  async sendNotificationRegisterForUser(email, data) {
    let content = email_message.NOTIF_REGISTRATION;
    let text = content.text_value
      .replaceAll("{firstName}", data.firstName)
      .replaceAll("{lastName}", data.lastName)
      .replaceAll("{username}", data.username)

    let html = content.html_value
    .replaceAll("{firstName}", data.firstName)
    .replaceAll("{lastName}", data.lastName)
    .replaceAll("{username}", data.username)

    await this.sendEmail("Registration", email, text, html);
  }
  async sendNotificationRegisterForAdmin(email, data) {
    let content = email_message.VERIFY_REGISTRATION;
    let text = content.text_value
    .replaceAll("{firstName}", data.firstName)
    .replaceAll("{lastName}", data.lastName)
    .replaceAll("{username}", data.username)

    let html = content.html_value
    .replaceAll("{firstName}", data.firstName)
    .replaceAll("{lastName}", data.lastName)
    .replaceAll("{username}", data.username) 
    .replaceAll("{headOfFamily}", data.headOfFamily)
    .replaceAll("{isMale}", data.isMale)
    .replaceAll("{isMarried}", data.isMarried)
    .replaceAll("{phone}", data.phone)
    .replaceAll("{homeId}", data.homeId)
    .replaceAll("{job}", data.job)

    await this.sendEmail("Registration Verify", email, text, html);
  }
  async sendNotificationApprovedRegister(email, data) {
    let content = email_message.NOTIF_APPROVED_REGISTER;
    let text = content.text_value
      .replaceAll("{firstName}", data.firstName)
      .replaceAll("{lastName}", data.lastName)
      .replaceAll("{username}", data.username)

    let html = content.html_value
    .replaceAll("{firstName}", data.firstName)
    .replaceAll("{lastName}", data.lastName)
    .replaceAll("{username}", data.username)

    await this.sendEmail("Registration", email, text, html);
  }
}
module.exports = EmailRepository;
