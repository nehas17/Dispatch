var { DB } = require('../config/constants');
module.exports = {
    checkCredentials: async (con, { name, password }) => {
        return await con.query(
            `SELECT 
                u.*
            FROM
                ${DB.USER} u
            WHERE
                u.name = "${name}" AND
                u.password ="${password}" 
                `)

    }
};
