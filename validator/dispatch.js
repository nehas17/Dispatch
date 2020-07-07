const form = require('express-form');
const field = form.field;

module.exports = {
    addDispatch: form(
        field('delivery_number')
            .trim()
            .required('', 'Delivery Number  is required and should be numeric')
            .is(/^[0-9]+$/),
        field('shipment_number')
            .trim()
            .is(/^[0-9]+$/),
        field('source_code')
            .trim()
            .required('', 'Source Code is required'),
        field('destination_code')
            .trim()
            .required('', 'Destination Code is required'),
        field('vehicle_number')
            .trim()
            .required('', 'Vehicle Number is required and should be numeric'),
        field('transporter_code')
            .trim()
            .required('', 'Transporter Code is required'),
        field('name')
            .trim(),
        field('phone')
            .trim(),
        field('start_date')
            .trim(),
        field('end_date')
            .trim()

    ),

}