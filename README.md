# little-star
Star rating bar library based on Font-awesome icons.

# How to use
Use as jQuery Plugin:
````
$('#rating-bar').littlestar({
  max: 5,
  stars: 3
});
````

OOP style:
````
var $container = $('#rating-bar');
var littleStar = new LittleStar({
  max: 5,
  stars: 3
});
$container.html(littleStar.getView());
````
# License
Licensed under The MIT License.
