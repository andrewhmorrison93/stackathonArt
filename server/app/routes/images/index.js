var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Image = mongoose.model('Image');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

router.get('/', function (req, res, next) {
	Image.find({})
	.then(function(images){
		console.log("IMAGES", images);
		res.json(images);
	})
});

router.get('/:id', function (req, res, next) {
	Image.findById(req.params.id)
	.populate('reaction')
	.then(function(image){
		res.json(image);
	})
});

router.post('/', function (req, res, next){
	var imgData = req.body.image.split(",")[1];
	var imgBuffer = new Buffer(imgData, "base64");
	var imgPath = "/images/" + Date.now() + ".png";
	var file = fs.writeFileAsync("./" + imgPath, imgBuffer);
	var imgCreated = Image.create({image: imgPath})
	.then(function(createdImage){
		res.json(createdImage);
	})

	Promise.all([file, imgCreated])
	.then(function(){
		console.log("file created!")
	})
});

router.put('/:id', function(req, res, next){
	Image.findById(req.params.id)
	.then(function(image){
		image.reaction.push(req.body.reaction);
		return image.save();
	})
    .then(function(image) {
        res.json(image);
    })
    .then(null, next);
})