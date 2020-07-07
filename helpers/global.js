const { DB } = require('../config/constants');
const moment = require('moment');
const self = module.exports = {
    getResponse: (status, msg, data = {}, err = null, mobile_msg = "") => {

        return new Promise(resolve => {
            resolve({
                "status": status,
                "msg": msg,
                "mobile_msg": mobile_msg != "" ? mobile_msg : msg,
                "data": data,
                "err": err
            });
        });
    },

    formErrors: (errors) => {
        let response = [];

        for (var err in errors) {
            response.push(errors[err][0]);
        }
        return response;
    },

    globalResponse: (res, statusCode, status, msg, data = {}, err = null, mobile_msg = "") => {

        return res.status(statusCode).json({ 'status': status, 'msg': msg, result: data, err: err })

    }

}