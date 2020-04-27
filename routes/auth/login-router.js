require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbModel.js');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    let { username, password } = req.body;

    db.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);
                res.status(200).json({ message: `Successfully logged in, ${user.username}!`, token });
            } else {
                res.status(401).json({ errorMessage: 'The credentials are invalid!' });
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error logging you in." });
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