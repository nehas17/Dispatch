let jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/constants");
const { globalResponse } = require("../helpers/global");

module.exports = {
    auth: (req, res, next) => {
       
        let token = req.headers["access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
      
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                  
                    globalResponse(res, 403, 0, "Unauthorize User", [], []);
                } else {
                    req.user = user;
                    next();
                }
            });
        } else {
            globalResponse(res, 403, 0, "Missing Token", [], []);
            return;
        }
    },
};
