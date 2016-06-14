const {createTransport} = require('nodemailer');
const defaults = require('lodash/defaults');
const {renderFile} = require('ejs');

const transporter = createTransport(process.env.MAIL_URL);
const defaultMailOptions = {
  from: `"Let's run" <foo@blurdybloop.com>`
};

const EMAIL = {
    *sendRemoveConfirmation({ name, email, id, token }) {
        const mailOptions = defaults({
            to: email,
            subject: 'Potwierdź rezygnację z uczestnictwa w biegu'
        }, defaultMailOptions);
        
        const firstName = name.split(/\s/)[0];
        const confirmationUrl = `${process.env.ROOT_URL}/confirm/${id}/${token}`;


        mailOptions.html = yield new Promise((resolve, reject) => {
            renderFile('private/remove_confirmation.ejs', { firstName, confirmationUrl }, (err, html) => {
                if (err) {
                    reject(err);
                }

                resolve(html);
            });
        });

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject(err);
                }
                resolve(info);
            });
        });
    }
};

module.exports = EMAIL;