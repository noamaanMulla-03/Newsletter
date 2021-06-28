const express = require("express");
const https = require("https");
const request = require("request");
const favicon = require("serve-favicon");

const app = express();
const PORT = process.env.PORT || 3000;

const dc = "us6";
const audience_list = "57c533a7f4";
const api_key = "2f0881a3bc0caf7d0c9b2bcdd9a27ed5-us6";
const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audience_list}`;

const options = {
    url: `https://${dc}.api.mailchimp.com/3.0/lists/${audience_list}`,
    method: "POST",
    headers: {
        Authorization: `auth ${api_key}`
    }
}

app.use(express.static("assets"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(favicon(`${__dirname}/assets/icon.png`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("signup");
});

app.post("/", (req, res) => {
    
    const userData = JSON.stringify({
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.fname,
                    LNAME: req.body.lname
                }
            }
        ]
    });
    
    const options = {
        url: `https://${dc}.api.mailchimp.com/3.0/lists/${audience_list}`,
        method: "POST",
        headers: {
            Authorization: `auth ${api_key}`
        },
        body: userData
    }
    
    request(options, (err, response, body) => {
        if(err) {
            res.send(err);
        } else {
            if(response.statusCode === 200)
                res.render("success");
            else
                res.render("failure");
        }
    });
    
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

// const options = {
//     method: "POST",
//     auth: `noamaan: ${api_key}`
// }

// const request = https.request(url, options, (httpsResponse) => {
//     httpsResponse.on('data', (data) => {
//         console.log(JSON.parse(data));
//     });
// });

// request.write(userData);
// request.end();

// res.end();

// api-key: 2f0881a3bc0caf7d0c9b2bcdd9a27ed5-us6
// audience list: 57c533a7f4