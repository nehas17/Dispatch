const express = require('express');
const path = require('path');
const app = express();
// const config = require('../config');
const bodyParser = require('body-parser');

// Routes Including
require('./config/routes')(app);

const PORT = 5000;
const cors = require('cors');
// End Routes Including;

const apiHelper = require('./client/src/helpers/index')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors())

//admin route
//app.use('/admin', admin);




app.use("/api/*", async (req, res) => {
    
    try {
        const result = await apiHelper(req, res)
        const { statusCode = 200 } = result
        res.status(statusCode).json(result);
    } catch (e) {
        const response = {
            msg: e.message ? e.message : ERR_MSG
        }
        res.status(500).json(response)
    }


});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})


app.listen(PORT, (err) => {
    if (err) console.log("err");

    console.log("port started");
})
