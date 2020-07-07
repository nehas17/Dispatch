var { DB } = require('../config/constants');
module.exports = {
    add: async (con, data) => {

        let query = `
            INSERT INTO
                ${DB.DISPATCH}
            SET ?`;
    
        return await con.query(query, [data]);

    },
    list: async (con, search) => {
        let query = ` 
        SELECT 
            d.* 
        FROM
            ${DB.DISPATCH} d 
        WHERE
          1=1    
        `;

        if (search != "") {
            query += `AND
            d.vehicle_number LIKE '%${search}%'
          OR
            d.transporter_code LIKE '${search}' 
          OR 
            d.delivery_number  LIKE '${search}' 
          OR 
            d.source_code  LIKE '${search}' 
          OR 
            d.destination_code  LIKE '${search}' 
          `
        }

        return await con.query(query);
    },

    listCount: async (con, search) => {
        let query = ` 
        SELECT 
            count(distinct d.id)
        FROM
            ${DB.DISPATCH} d 
        WHERE
          1=1    
        `;

        if (search != "") {
            query += `AND
            d.vehicle_number LIKE '%${search}%'
          OR
            d.transporter_code LIKE '${search}' 
          OR 
            d.delivery_number  LIKE '${search}' 
          OR 
            d.source_code  LIKE '${search}' 
          OR 
            d.destination_code  LIKE '${search}' 
          `
        }


        return await con.query(query);
    },



};
