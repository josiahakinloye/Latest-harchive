/**
 * This module allows us to notify users based on certain actions performed by them
 */

/**
 * Notify by email
 * @param {
 *     
 * } - options
 */
export const mailNotifier = (options) => {
    return new Promise((resolve, reject) => {

        sails.hooks.email.send(
            "welcomeEmail",
            {
                Name: obj.name
            },
            {
                to: obj.email,
                subject: "Welcome Email"
            },
            function (err) {
                err ? reject(err) : resolve("Mail Sent!");
            }
        );
    })
}