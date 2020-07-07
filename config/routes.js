module.exports = (app) => {
    app.use('/', require("../routes/user"));
    app.use('/dispatch', require("../routes/dispatch"));
    

}