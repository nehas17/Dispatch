const { formErrors, globalResponse } = require("../helpers/global");
const con = require("../config/dbConfig");
const { add, list, listCount } = require("../models/dispatch");
const { ERR_MSG, SECRET_KEY } = require("../config/constants");

module.exports = {
    add: async (req, res) => {
        
        if (!req.form.isValid) {
            const errors = formErrors(req.form.getErrors());
            globalResponse(res, 200, 0, "Validation Errors", [], errors);
            return;
        }
        try {
            let data = req.body;
            const result = await add(con, data);
            if (result) {
                globalResponse(res, 200, 1, "Dispatcher Added Successfully", null);
            } else {
                globalResponse(res, 200, 0, "Something went wrong", {});
            }
        } catch (e) {
            console.log(e);
            globalResponse(res, 503, 0, ERR_MSG, [], e);
        }
    },
    list: async (req, res) => {

        let search = req.query.search != undefined ? req.query.search : "";

        try {
            let result = await list(con, search);
            let Count = await listCount(con, search);

            let resp = {
                list: result,
                count: Count && Count.length ? Count[0].count : 0
            }
            globalResponse(res, 200, 1, "Data Fetch Successfully!!", resp);

        } catch (e) {
            console.log(e);
            globalResponse(res, 503, 0, ERR_MSG, [], e);
        }
    },
};
