const form = require('express-form');
const field = form.field;
console.log("hii");
module.exports = {
  
    validateLogin: form(
        
        field('name')
            .trim()
            .required('', 'name is required'),
        field('password')
            .trim()
            .required('', 'Password is required')
    ),
 
};