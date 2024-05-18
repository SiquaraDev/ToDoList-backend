const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
    const getHash = (password, callback) => {
        bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(password, salt, null, (_, hash) => callback(hash));
        });
    };

    const save = (req, res) => {
        getHash(req.body.password, (hash) => {
            const password = hash;

            app.db("users")
                .insert({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password,
                })
                .then((_) => res.status(204).send("User created."))
                .catch((err) => res.status(400).json(err));
        });
    };

    return { save };
};
