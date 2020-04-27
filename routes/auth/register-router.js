require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbModel.js');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    db.add(user)
        .then(saved => {
            res.status(201).json({ message: `Successfully registered, ${user.username}!` });
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error registering." });
        });
});

function genToken(user) {

    const payload = {
        userid: user.id,
        username: user.username,
        department: user.department
    };

    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return token;
}


module.exports = router;