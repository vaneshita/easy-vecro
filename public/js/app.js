'use strict';

var initMap = function initMap() {
  var start = document.getElementById('start-input');
  var end = document.getElementById('meta-input');

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15, // zoom  nivel de profundidad de nuestro mapa
    center: { lat: -12.045643,
      lng: -77.030605 }, // center contiene la longitud y latitud que muestra el mapa
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  var find = function find() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position, error); // getCurrentPosition obtiene ubicacion
    }
  };

  var latitud = void 0,
      longitud = void 0;

  var position = function position(posicion) {
    // obtiene latitud o longitud y además crearemos un marcador de nuestra ubicación.
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbication = new google.maps.Marker({
      position: { lat: latitud,
        lng: longitud },
      animation: google.maps.Animation.DROP,
      map: map
    });

    map.setZoom(15);
    map.setCenter({ lat: latitud,
      lng: longitud });
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
};