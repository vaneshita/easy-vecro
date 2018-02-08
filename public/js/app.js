'use strict';

var latitud = -12.045643;
var longitud = -77.030605;
var miUbication = function miUbication(lat1, lon2) {};
var marcador1 = null; // Tu posicion
var marcador2 = null; // Start
var marcador3 = null; // END


var initMap = function initMap() {
  var start = document.getElementById('start-input');
  var end = document.getElementById('meta-input');
  var ruta = document.getElementById('ruta');
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15, // zoom  nivel de profundidad de nuestro mapa
    center: { lat: -12.045643,
      lng: -77.030605 // center contiene la longitud y latitud que muestra el mapa
    } });

  var find = function find() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position, error); // getCurrentPosition obtiene ubicacion
    }
  };

  var position = function position(posicion) {
    // obtiene latitud o longitud y además crearemos un marcador de nuestra ubicación.
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
    miUbication(latitud, longitud);
    map.setZoom(15);
    map.setCenter({ lat: latitud,
      lng: longitud });
  };

  marcador1 = new google.maps.Marker({
    position: {
      lat: latitud,
      lng: longitud },
    animation: google.maps.Animation.DROP,
    map: map
  });

  miUbication = function miUbication(lat1, lon, opt) {
    var pos = {
      lat: latitud,
      lng: longitud
    };
    marcador1.setPosition(pos);
    marcador1.setMap(map);
  };

  var error = function error(_error) {
    alert('tenemos un problema con encontrar tu ubicación');
  };

  // autocompletado

  var autocompleteStar = new google.maps.places.Autocomplete(start);
  var autocompleteEnd = new google.maps.places.Autocomplete(end);
  // metodo para restringir
  autocompleteStar.bindTo('bounds', map);
  autocompleteEnd.bindTo('bounds', map);

  document.getElementById('find-me').addEventListener('click', find);

  autocompleteStar.addListener('place_changed', function () {
    var place = autocompleteStar.getPlace(false);
    if (!place.geometry.viewport) {
      window.alert('Error al mostrar el lugar');
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(18);
    }
    if (marcador2 === null) {
      marcador2 = new google.maps.Marker({
        animation: google.maps.Animation.DROP
      });
      marcador2.setPosition(place.geometry.location);
      marcador2.setMap(map);
    } else {
      marcador2.setVisible(false);
      marcador2.setPosition(place.geometry.location);
      marcador2.setVisible(true);
    }

    // markerPoint.setPosition(place.geometry.location);
    // markerPoint.setVisible(true);para este
  });

  autocompleteEnd.addListener('place_changed', function () {
    var place = autocompleteEnd.getPlace(false);
    if (!place.geometry.viewport) {
      window.alert('Error al mostrar el lugar');
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(18);
      // y para aqui
    }
    if (marcador3 === null) {
      marcador3 = new google.maps.Marker({
        animation: google.maps.Animation.DROP
      });
      marcador3.setPosition(place.geometry.location);
      marcador3.setMap(map);
    } else {
      marcador3.setVisible(false);
      marcador3.setPosition(place.geometry.location);
      marcador3.setVisible(true);
    }
  });
};