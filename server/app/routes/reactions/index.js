var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Reaction = mongoose.model('Reaction');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

router.get('/', function (req, res, next) {
	Reaction.find({})
	.then(function(reactions){
		console.log("Reactions", reactions);
		res.json(reactions);
	})
});

router.get('/:id', function (req, res, next) {
	Reaction.findById(req.params.id)
	.then(function(reaction){
		res.json(reaction);
	})
});

router.post('/', function (req, res, next){
	var reactionData = req.body.reaction.split(",")[1];
	var reactionBuffer = new Buffer(reactionData, "base64");
	var reactionPath = "/reactions/" + Date.now() + ".png";
	var file = fs.writeFileAsync("./" + reactionPath, reactionBuffer);
	var reactionCreated = Reaction.create({reaction: reactionPath, image: req.body.image})
	.then(function(createdReaction){
		res.json(createdReaction);
	})

	Promise.all([file, reactionCreated])
	.then(function(){
		console.log("file created!")
	})
});

router.put('/:id', function(req, res, next){
	Reaction.findById(req.params.id)
	.then(function(reaction){
		reaction.image = req.body.image;
		return reaction.save();
	})
    .then(function(reaction) {
        res.json(reaction);
    })
    .then(null, next);
})