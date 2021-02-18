import * as express from 'express';
import * as mailgunLoader from 'mailgun-js';
import config from '../../config'

const router = express.Router();

const mg = mailgunLoader({
    apiKey: config.mailgun.secret,
    domain: config.mailgun.url
});

const send = (to: string, from: string, subject: string, content: string) => {
    const data = { to, from, subject, text: content };
    return mg.messages().send(data);
}

router.post('/contact', async (req, res) => {
    try {
        const { to, from, subject, content } = req.body;
        if (to && from && subject && content) {
            send(to, from, subject, content);
            res.send(`Message to ${to} sent!`);
        } else {
            throw new Error('Sneaky hacker trying to edit fields or put in falsy values from the frontend, smh')
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


export default router;