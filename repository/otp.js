const { Otp } = require('../models');
const func = require("../libs/function");
const Op = require('sequelize').Op

class OtpRepository {
    constructor() {
        this.OtpModel = Otp;
    }

    async deleteAllOtp(email) {
        await this.OtpModel.destroy({
            where: {
                email: email
            }
        });
    }

    async generateOTP(email, email_type) {
        await this.deleteAllOtp(email)
        let otp_obj = {
            email: email,
            email_type: email_type,
            otp_code: func.generateRandomNumber(6)
        }
        let minutesToAdd = 2
        let currentDate = new Date()
        otp_obj.expired_at = new Date(currentDate.getTime() + minutesToAdd * 60000)

        await this.OtpModel.create(otp_obj)

        return otp_obj
    }


    async getOTP(email, otp_code, email_type) {
        let otp = null
        otp = await this.OtpModel.findOne({
            where: {
                email: {
                    [Op.eq]: email
                },
                otp_code: {
                    [Op.eq]: otp_code
                },
                email_type: {
                    [Op.eq]: email_type
                },
                expired_at: {
                    [Op.gt]: new Date()
                }
            }
        })
        if (otp === null) {
            return null
        }
        otp = otp.get()
        return otp
    }
    async getOTPByEmail(email) {
        let otp = null
        otp = await this.OtpModel.findOne({
            where: {
                email: {
                    [Op.eq]: email
                },
                expired_at: {
                    [Op.gt]: new Date()
                }
            }
        })
        if (otp === null) {
            return null
        }
        otp = otp.get()
        return otp
    }

}

module.exports = OtpRepository