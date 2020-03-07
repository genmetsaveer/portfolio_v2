require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const myEmail = process.env.EMAIL;

sgMail.setApiKey(process.env.API_KEY);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/message', (req, res, next) => {
    const { body } = req;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (body.check !== '') {
        return res.status(404).json({ error: `Don't check that box!` });
    }
    if (!body.sender) {
        return res.status(404).json({ error: 'E-mail missing!' });
    } else if (!body.content) {
        return res.status(404).json({ error: 'Content missing!' });
    } else if (!re.test(body.sender)) {
        return res.status(404).json({ error: "Malformatted e-mail address!" })
    } else if (!body.name) {
        return res.status(404).json({ error: 'Name is missing!' });
    }
    const msg = {
        to: myEmail,
        from: body.sender,
        subject: 'From portfolio - ' + body.name,
        text: body.content,
    };
    sgMail.send(msg)
        .then(() => {
            console.log(msg);
            res.json(msg);
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
});

app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${HOST}:${PORT}`);
});