const resData = require("../helper/response");

module.exports = {
    getProfile: async (req, res, next) => {
        try {
            let { id } = req.user;
            let user = await req.userUC.getProfile(id);
            if (user.isSuccess === false) {
                return res.status(user.status).json(resData.failed(user.reason));
            }
            res.status(user.status).json(resData.success(user.data));
        } catch (e) {
            next(e);
        }
    },

    updateMemberByAdmin: async (req, res, next) => {
        try {
            let { id } = req.params;
            let updateData = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                headOfFamily: req.body.headOfFamily,
                birth: new Date(req.body.birth),
                isMale: req.body.isMale,
                isMarried: req.body.isMarried,
                email: req.body.email,
                phone: req.body.phone,
                homeId: req.bodyhomeId,
                job: req.body.job,
                roleId: req.body.roleId,
            }
            let updateUser = await req.userUC.updateMemberByAdmin(updateData, id);
            if (updateUser.isSuccess === false) {
                return res
                    .status(updateUser.status)
                    .json(resData.failed(updateUser.reason));
            }
            res.status(updateUser.status).json(resData.success());
        } catch (e) {
            next(e);
        }
    },

    updateAvatar: async (req, res, next) => {
        try {
            let { id } = req.user;
            let user = {
                image: req.file.path,
            };
            let updateAvatar = await req.userUC.updateUserImage(user, id);
            if (updateAvatar.isSuccess === false) {
                return res
                    .status(updateAvatar.status)
                    .json(resData.failed(updateAvatar.reason));
            }
            res.status(updateAvatar.status).json(resData.success());
        } catch (e) {
            next(e);
        }
    },

    updatePassword: async (req, res, next) => {
        try {
            let { id } = req.user;
            let dataPassword = {
                oldPassword: req.body.oldPassword,
                newPassword: req.body.newPassword,
                confirmNewPassword: req.body.confirmNewPassword,
            };
            let updatePassword = await req.userUC.updatePassword(dataPassword, id);
            if (updatePassword.isSuccess === false) {
                return res
                    .status(updatePassword.status)
                    .json(resData.failed(updatePassword.reason));
            }

            res.status(updatePassword.status).json(resData.success());
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {

        let email = req.query.email;
        let user = {
            newPassword: req.body.newPassword,
            confirmNewPassword: req.body.confirmNewPassword,
            otp_: req.body.otp_,
        };
        try {
            resReset = await req.userUC.resetPassword(user, email);
            if (resReset.isSuccess !== true) {
                return res
                    .status(resReset.status)
                    .json(resData.failed(resReset.reason));
            }
            res.status(resReset.status).json(resData.success());
        } catch (e) {
            next(e);
        }
    },
    updateEmail: async (req, res, next) => {
        let id = req.user.id;
        let userData = {
            email: req.body.email,
            otp_: req.body.otp_,
        };
        try {
            let resUpdate = await req.userUC.updateEmail(userData, id);
            if (resUpdate.isSuccess !== true) {
                return res
                    .status(resUpdate.status)
                    .json(resData.failed(resUpdate.reason));
            }
            res.status(resUpdate.status).json(resData.success());
        } catch (e) {
            next(e);
        }
    },
};