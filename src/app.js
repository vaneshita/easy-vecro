let initMap = () => {
  const start = document.getElementById('start-input');
  const end = document.getElementById('meta-input');
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15, // zoom  nivel de profundidad de nuestro mapa
    center: {lat: -12.045643, 
      lng: -77.030605}, // center contiene la longitud y latitud que muestra el mapa
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  let find = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position, error);// getCurrentPosition obtiene ubicacion
    }
  };

  let latitud, longitud;

  let position = (posicion) => {// obtiene latitud o longitud y además crearemos un marcador de nuestra ubicación.
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    let miUbication = new google.maps.Marker({
      position: {lat: latitud,
        lng: longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });

    map.setZoom(15);
    map.setCenter({lat: latitud,
      lng: longitud});
  };

  var error = (error) => {
    alert('tenemos un problema con encontrar tu ubicación');
  };

  // autocompletado

  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(end);


  document.getElementById('find-me').addEventListener('click', find);
};

