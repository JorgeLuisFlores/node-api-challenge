const express = require("express");
const projectdb = require("../data/helpers/projectModel.js");
const actiondb = require("../data/helpers/actionModel.js");
const actionRouter = require("../actions/actionRouter.js");
const router = express.Router();


router.use("/:id/actions", actionRouter);

router.get("/", (req, res) => {
    projectdb
        .get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json({
                message: "Cannot find Projects!"
            });
        });
});



router.get("/:id", (req, res) => {
    projectdb.get(req.params.id).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({
                message: "The project with the specified ID does not exist!"
            });
        }
    });
});



router.get("/:id/actions", (req, res) => {
    projectdb
        .getProjectActions(req.params.id)
        .then(projectaction => {
            res.status(200).json(projectaction);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving the actions belonging to this project!"
            });
        });
});



router.post("/", validateProject, (req, res) => {
    projectdb
        .insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: "Unable to post the project!"
            });
        });
});



router.put("/:id", validateProject, (req, res) => {
    projectdb.update(req.params.id, req.body).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({
                message: "The project with the specified ID does not exist!"
            });
        }
    });
});



router.delete("/:id", (req, res) => {
    projectdb.remove(req.params.id).then(user => {
        if (user > 0) {
            res.status(200).json({
                message: "Project has been deleted!"
            });
        } else {
            res.status(404).json({
                message: "The project with the specified ID does not exist!"
            });
        }
    });
});


router.post("/:id/actions", validateAction, (req, res) => {
    const actionInfo = {
        ...req.body,
        project_id: req.params.id
    }

    actiondb
        .insert(actionInfo)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Unable to post the action!"
            });
        });
});



//Middleware
function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(404).json({
            message: "Missing Name & Description for the project!"
        });
    } else {
        next();
    }
}


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