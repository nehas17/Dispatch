const { formErrors, globalResponse } = require("../helpers/global");
const con = require("../config/dbConfig");
const { checkCredentials } = require("../models/user");
const md5 = require("md5");
const { ERR_MSG, SECRET_KEY, DB } = require("../config/constants");
const jwt = require("jsonwebtoken");
module.exports = {
    login: async (req, res) => {
        if (!req.form.isValid) {
            const errors = formErrors(req.form.getErrors());
            globalResponse(res, 200, 0, "Validation Errors", [], errors);
            return;
        }
        try {
            let { name, password } = req.body;

            password = md5(password);
            

            const [result] = await checkCredentials(con, { name, password });
            if (result) {
                delete result.password;
                const token = jwt.sign(
                    {
                        ...result,
                    },
                    SECRET_KEY,
                    {
                        expiresIn: 60, // expires in 5 min
                    }
                );
                result.token = token;
                globalResponse(res, 200, 1, "Login successfully", result);
            } else {
                globalResponse(res, 200, 0, "Invalid credentials", []);
            }
        } catch (e) {
            console.log(e);
            globalResponse(res, 500, 0, ERR_MSG, [], e);
        }
    },
};
