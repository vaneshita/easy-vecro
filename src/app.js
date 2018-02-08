let latitud = -12.045643;
let longitud = -77.030605;
let miUbication = (lat1, lon2) => {};
let marcador1 = null; // Tu posicion
let marcador2 = null; // Start
let marcador3 = null; // END


let initMap = () => {
  const start = document.getElementById('start-input');
  const end = document.getElementById('meta-input');
  const ruta = document.getElementById('ruta');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15, // zoom  nivel de profundidad de nuestro mapa
    center: {lat: -12.045643, 
      lng: -77.030605} // center contiene la longitud y latitud que muestra el mapa
  });

  let find = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position, error);// getCurrentPosition obtiene ubicacion
    }
  };

  const position = (posicion) => {// obtiene latitud o longitud y además crearemos un marcador de nuestra ubicación.
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
    miUbication(latitud, longitud);
    map.setZoom(15);
    map.setCenter({lat: latitud,
      lng: longitud});
  };

  marcador1 = new google.maps.Marker({
    position: {
      lat: latitud,
      lng: longitud},
    animation: google.maps.Animation.DROP,
    map: map
  });

  miUbication = (lat1, lon, opt) => {
    let pos = {
      lat: latitud,
      lng: longitud
    };
    marcador1.setPosition(pos);
    marcador1.setMap(map);
  };
  

  var error = (error) => {
    alert('tenemos un problema con encontrar tu ubicación');
  };

  // autocompletado

  let autocompleteStar = new google.maps.places.Autocomplete(start);
  let autocompleteEnd = new google.maps.places.Autocomplete(end);
  // metodo para restringir
  autocompleteStar.bindTo('bounds', map);
  autocompleteEnd.bindTo('bounds', map);

  document.getElementById('find-me').addEventListener('click', find);


  autocompleteStar.addListener('place_changed', () => {
    let place = autocompleteStar.getPlace(false);
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
        animation: google.maps.Animation.DROP,
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

  autocompleteEnd.addListener('place_changed', () => {
    let place = autocompleteEnd.getPlace(false);
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
        animation: google.maps.Animation.DROP,
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
