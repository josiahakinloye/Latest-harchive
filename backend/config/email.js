module.exports.email = {
    config: (from, fromName) => ({
        service: "Mailgun",
        auth: {
            user: "postmaster@sandboxc154e7e524f24b21a36e0b452bafd299.mailgun.org",
            pass: "b6143fc971e2f5949c8fea2330cbb7ad-bbbc8336-3b643326"
        },
        templateDir: "api/emailTemplates",
        from: from,
        testMode: false,
        ssl: true

    })
}