const {createTransport} = require('nodemailer');
const defaults = require('lodash/defaults');
const {renderFile} = require('ejs');

const transporter = createTransport(process.env.MAIL_URL);
const defaultMailOptions = {
  from: `"Let's run" <foo@blurdybloop.com>`
};

const EMAIL = {
    *sendRemoveConfirmation({ name, email, id }) {
        const mailOptions = defaults({
            to: email,
            subject: 'Potwierdź rezygnację z uczestnictwa'
        }, defaultMailOptions);
        
        const firstName = name.split(/\s/)[0];
        const confirmationUrl = 'http://generallyfake';

        mailOptions.html = yield new Promise((resolve) => {
            renderFile('private/remove_confirmation.ejs', { firstName, confirmationUrl }, (err, html) => {
                if (err) {
                    throw new Error(err);
                }

                resolve(html);
            });
        });

        return new Promise((resolve) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    throw new Error(err);
                }
                resolve(info);
            });
        });
    }
};

module.export = EMAIL;