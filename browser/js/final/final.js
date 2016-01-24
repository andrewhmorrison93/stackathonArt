app.config(function ($stateProvider) {
    $stateProvider.state('final', {
        url: '/final/:id',
        controller: 'FinalCtrl',
        templateUrl: 'js/final/final.html',
        resolve: {
        	image: function(ImageFactory, $stateParams) {
        		return ImageFactory.fetchById($stateParams.id);
        	}
        }
    });
});

app.controller('FinalCtrl', function ($scope, ImageFactory, image) {
	$scope.image = image;
	console.log("Image is: ", $scope.image.image);
	console.log("reactions are:", $scope.image.reaction);
	var canvas, context, mainImage;
	var reactionImages = [];
	$scope.reactions = [];

	// //get the canvas element
	canvas = document.getElementById('canvas2');

    // Get the 2D canvas context.
    context = canvas.getContext('2d');

    mainImage = new Image();
    mainImage.onload = function() {
    	context.drawImage(mainImage, 0, 0, 640, 480);
    	setReactionImages();
    	console.log("REACTION IMAGES ARE:",reactionImages);

    }
    mainImage.src = $scope.image.image;
    console.log("MAIN IMAGE IS:", mainImage);

    $scope.image.reaction.forEach(function(reaction){
    	console.log("REACTION IS:", reaction.reaction);
    	$scope.reactions.push(reaction.reaction);
    })
    	console.log($scope.reactions);
    var setReactionImages = function () {
    	for (var i = 0; i<$scope.reactions.length; i++) {
	    	var newImage = new Image();
	    	newImage.src = $scope.reactions[i];
	    	reactionImages.push(newImage);
	    	console.log("New image is: ", newImage);
    	}
    	drawReactions();
    }

    var drawReactions = function () {
    	reactionImages.forEach(function(image) {
    		image.onload = function() {
    			context.drawImage(image, 0, 0, 640, 480);
    		}
    	})
    }

});

app.factory('FinalFactory', function($http){
	return {

	}
});