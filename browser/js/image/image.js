app.config(function ($stateProvider) {
    $stateProvider.state('image', {
        url: '/images/:id',
        controller: 'ImagesCtrl',
        templateUrl: 'js/image/image.html'
    });
});