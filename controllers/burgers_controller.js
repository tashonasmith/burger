var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name"], [req.body.burger_name], function(result) {
        res.redirect("/");
    });
});

router.put("/api/burgers/:id", function(req, res) {

    burger.updateOne(
        
            {devoured: true}, req.params.id, function(data) {
                res.sendStatus(200)
            })  

});

module.exports = router;