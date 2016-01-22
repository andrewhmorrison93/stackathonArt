app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeCtrl', function ($scope, HomeFactory) {
	var context;
	var canvas = document.getElementById('canvas');
	$scope.snapped = false;

	//take a photo of yourself
  $scope.snap = function() {
  	console.log("hi");
	  	$scope.snapped = true;
	  	context = canvas.getContext("2d");
	  	context.drawImage(video, 0, 0, 640, 480);
};

	//save a photo of yourself
	$scope.save = function() {
		var imgData = canvas.toDataURL(0,0,640,480);
		console.log(imgData);
		HomeFactory.createImage(imgData);
		//context.putImageData(imgData);
		//CONTINUE HERE TOMORROW! GET IT TO SAVE IN A DATABASE
			//perhaps change getImageData to .toDataUrl() //seems to be bit 64 encoded....not sure if this is important
	}

	$scope.retake = function() {
		$scope.snapped = false;
	}


//video player logic
var videoObj = {"video": true, "audio": false};

var video = document.getElementById("video");

navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

navigator.getMedia({
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    });

});


app.factory('HomeFactory', function ($http) {
    return {
    	createImage : function(data) {
    		$http.post('/api/images', {image: data})
    		.then(function(response){
    			return response.data;
    		})
    	}
    }
});
