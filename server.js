const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const json = require("body-parser/lib/types/json");
let ipAddr;
let output;

app.use(bodyParser.json());
app.use(cors())

app.post("/:ip", (req, res) => {
    
    ipAddr = req.params.ip;

    exec(`ping -n 4 ${ipAddr}`, (err, stdout) => {

        if (err) {
            console.log("Error", err);
            return res.status(500).json({ error: "Ping execution failed" });
        }

        output = stdout;
        res.json({ result: output.replaceAll('\r\n', ',') });
        console.log(output);

    });
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server running on port ${port}`);
    }
});
