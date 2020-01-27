const express = require("express");
const actiondb = require("../data/helpers/actionModel.js");
const router = express.Router();


router.get("/", (req, res) => {
    actiondb
        .get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json({
                message: "Cannot find actions!"
            });
        });
});



router.get("/:id", (req, res) => {
    actiondb.get(req.params.id).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({
                message: "The project with the specified ID does not exist!"
            });
        }
    });
});



router.put("/:id", validateAction, (req, res) => {
    actiondb.update(req.params.id, req.body).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({
                message: "The action with the specified ID does not exist."
            });
        }
    });
});



router.delete("/:id", (req, res) => {
    actiondb.remove(req.params.id).then(user => {
        if (user > 0) {
            res.status(200).json({
                message: "Action has been deleted!"
            });
        } else {
            res.status(404).json({
                message: "The action with the specified ID does not exist!"
            });
        }
    });
});



//Middleware
function validateAction(req, res, next) {
    if (!req.body.description || !req.body.notes) {
        res.status(404).json({
            message: "Missing Description & Notes for the project!"
        });
    } else {
        next();
    }
}

module.exports = router;