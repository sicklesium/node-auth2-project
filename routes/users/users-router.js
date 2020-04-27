const router = require("express").Router();

const db = require("../../data/dbModel.js");
const restricted = require("../../middleware/restricted-middleware.js")

router.get('/', restricted, (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;