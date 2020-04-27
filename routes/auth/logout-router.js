const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbModel.js');

router.get('/', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ errorMessage: "There was an error logging out!" });
            } else {
                res.json({ message: "You are now logged out!" });
            }
        });
    } else {
        res.end();
    }
});

module.exports = router;