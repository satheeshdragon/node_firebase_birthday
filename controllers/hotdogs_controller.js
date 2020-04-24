var express = require("express");

var router = express.Router();

var hotdog = require("../models/hotdog_mod.js");

router.get("/", function(req, res) {
  hotdog.all(function(data) {
    var hbsObject = {
      hotdogs: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/insert_data", function(req, res) {
  
  hotdog.increment_id(function(data) {
    var hbsObject = {
      hotdogs: data
    };
    hotdog.create(req,data);

  });
   return res.status(200).end();
});

router.post("/delete", function(req, res) {
  
  hotdog.delete_user_data(req);
  return res.status(200).end();

});

router.post("/edit_data", function(req, res) {  
  hotdog.edit_user_data(req,function(data) {
    var hbsObject = {
      hotdogs: data
    };
      res.end(JSON.stringify(data));
  });
  // return res.status(200).end();
});

router.post("/update_data", function(req, res) {  
  hotdog.update_user_data(req,function(data) {
    var hbsObject = {
      hotdogs: data
    };
      // res.end(JSON.stringify(data));
  });
  return res.status(200).end();
});

router.put("/api/hotdogs/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  hotdog.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/hotdogs/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  hotdog.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;