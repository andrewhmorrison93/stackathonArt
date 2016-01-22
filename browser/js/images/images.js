app.config(function ($stateProvider) {
    $stateProvider.state('images', {
        url: '/images',
        templateUrl: 'js/images/images.html',
        controller: 'ImagesCtrl',
        resolve: {
            images: function(ImagesFactory) {
                return ImagesFactory.getImages();
            }
        }
    });
});

app.controller('ImagesCtrl', function ($scope, ImagesFactory, images) {
    $scope.images = images;
    console.log("IMAGES ARE:", images);
});


app.factory('ImagesFactory', function ($http) {
    return {
    	getImages: function() {
    		return $http.get('/api/images')
    		.then(function(response){
                console.log("HI ", response);
    			return response.data;
    		})
    	}
    }
});