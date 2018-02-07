'use strict';

// geolocalización

var coordinates = [];
var labels = [];

for (var i in data) {
  coordinates.push(data[i].location);
  labels.push(data[i].name);
}

var locations = coordinates;

function initMap() {
  var map = new google.maps.Map($('#map')[0], {
    center: { lat: -34.397,
      lng: 150.644 },
    zoom: 10
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You Are Here!');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i]
    });
  });

  //  marker clusterer
  var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}