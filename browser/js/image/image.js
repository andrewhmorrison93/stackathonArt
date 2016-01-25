app.config(function($stateProvider) {
    $stateProvider.state('image', {
        url: '/images/:id',
        controller: 'ImageCtrl',
        templateUrl: 'js/image/image.html',
        resolve: {
            image: function(ImageFactory, $stateParams) {
                return ImageFactory.fetchById($stateParams.id);
            }
        }
    });
});

app.controller('ImageCtrl', function($scope, ImageFactory, image, MailFactory) {
    $scope.image = image;

    var canvas, context, tool, canvas2, context2;
    var counter = 200;

    $scope.redo = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    $scope.save = function() {
        var reactionData = canvas.toDataURL(0, 0, 640, 480);
        //testing clearing image and setting image to what I drew!
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log(reactionData);
        var saveObj = {
            reaction: reactionData,
            image: image._id
        }
        ImageFactory.saveReaction(saveObj)
            .then(function(reaction) {
                ImageFactory.addReaction(image._id, reaction._id)
                    .then(function(updatedImage) {
                        console.log("image updated!", updatedImage);
                        if (updatedImage.reaction.length == 3) {
                            MailFactory.sendMail({
                            email: updatedImage.email,
                            subject: "Check Out Your Friends' Reactions",
                            id: "final/" + updatedImage._id
                        });
                        }
                        
                    })
            })
    }
    function init() {
        // Find the canvas element.
        canvas = document.getElementById('canvas1');

        // Get the 2D canvas context.
        context = canvas.getContext('2d');

        // Pencil tool instance.
        tool = new tool_pencil();

        // Attach the mousedown, mousemove and mouseup event listeners.
        canvas.addEventListener('mousedown', ev_canvas, false);
        canvas.addEventListener('mousemove', ev_canvas, false);
        canvas.addEventListener('mouseup', ev_canvas, false);
    }

    // This painting tool works like a drawing pencil which tracks the mouse
    // movements.
    function tool_pencil() {
        var tool = this;
        this.started = false;

        // This is called when you start holding down the mouse button.
        // This starts the pencil drawing.
        this.mousedown = function(ev) {
            context.beginPath();
            context.moveTo(ev._x, ev._y);
            if (counter >0) {
                tool.started = true;
            }
        };

        // This function is called every time you move the mouse. Obviously, it only
        // draws if the tool.started state is set to true (when you are holding down
        // the mouse button).
        this.mousemove = function(ev) {
            if (tool.started) {
                context.lineTo(ev._x, ev._y);
                context.strokeStyle = "red";
                context.stroke();
                counter--;
                canvas2.height = counter * 2.4;
                context2.fillStyle="#FF0000";
                context2.fillRect(0,0,100,counter * 2.4);
                console.log(counter);
                if (counter <0) {
                    tool.started = false;
                }
            }
        };

        // This is called when you release the mouse button.
        this.mouseup = function(ev) {
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
            }
        };
    }

    // The general-purpose event handler. This function just determines the mouse
    // position relative to the canvas element.
    function ev_canvas(ev) {
        if (ev.layerX || ev.layerX == 0) { // Firefox
            ev._x = ev.layerX;
            ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            ev._x = ev.offsetX;
            ev._y = ev.offsetY;
        }

        // Call the event handler of the tool.
        var func = tool[ev.type];
        if (func) {
            func(ev);
        }
    }


    init();

    //changing ink-jar
    // Find the canvas element.
        canvas2 = document.getElementById('canvas2');

        // Get the 2D canvas context.
        context2 = canvas2.getContext('2d');

        context2.fillStyle="#FF0000";
        context2.fillRect(0,0,100,500);


    console.log("IMAGE IS:", $scope.image);
});

app.factory('ImageFactory', function($http) {
    return {
        fetchById: function(id) {
            return $http.get('/api/images/' + id)
                .then(function(response) {
                    console.log("HI ", response);
                    return response.data;
                })
        },
        saveReaction: function(data) {
            return $http.post('api/reactions/', data)
                .then(function(response) {
                    return response.data;
                })
        },
        addReaction: function(id, data) {
            return $http.put('api/images/' + id, {
                    reaction: data
                })
                .then(function(response) {
                    return response.data;
                })
        },
        addEmail: function(id, data) {
            return $http.put('api/images/' + id, {
                email: data
            })
            .then(function(response) {
                return response.data;
            })
        }
    }
});

// app.directive('rectDesigner', function() {

//   function link(scope, el, attr) {

//     var svgwidth = 500,
//       svgheight = 600;

//     var svgContainer = d3.select(el[0])
//       .append('svg')
//       .attr('id', 'svgcontainer')
//       .attr({
//         width: svgwidth,
//         height: svgheight
//       });
//     // only append one rect
//     var rect = svgContainer
//       .append("rect")
//       .attr("id", "Rect")
//       .attr('transform', 'translate(' + svgwidth / 2 + ',' + svgheight / 2 + ')');

//     scope.$watchGroup(['rectWidth', 'rectHeight'], function(newValues) {

//       var width = newValues[0];
//       var height = newValues[1];

//       // now change it's width and height
//       rect.attr({
//         width: width,
//         height: height
//       });

//     }, true);
//   }
//   return {
//     controller: ImageCtrl,
//     link: link,
//   };
// });
