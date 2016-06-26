    // declares a global map variable

var initializeMap=function() {
  this.map = new google.maps.Map(document.querySelector('#map'), this.mapOptions);
  this.locations=[];
  this.mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    scaleControl: true
  };
  window.mapBounds = new google.maps.LatLngBounds();
  this.draw=new drawForecast();
}

initializeMap.prototype.run=function(){

  this.locations = this.locationFinder();
  this.pinPoster(this.locations);
  $(window).resize(function() {
    this.fitBounds();// Sets the boundaries of the map based on pin locations
  });
}

initializeMap.prototype.locationFinder=function() {
  // initializes an empty array
  var locations = [];

  // adds the single location property from bio to the locations array
  locations.push("Espoo,FI");
  locations.push("Madrid,Spain");
  locations.push("Beijing,China");
  locations.push("London,UK");

  return locations;
}

initializeMap.prototype.pinPoster=function(locations) {
  var service = new google.maps.places.PlacesService(this.map);
  var map=this.map;
  var draw=this.draw;

  createMapMarker=function(placeData) {
    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window
    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

   google.maps.event.addListener(marker, 'click', function() {
      loc.name=name;
      loc.lat=lat;
      loc.lon=lon;
      draw.updateForecaChart(loc);
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
      infoWindow.close();
    });

    bounds.extend(new google.maps.LatLng(lat, lon));
    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
  }

  locations.forEach(function(place){
    var request = {
        query: place
    };
    service.textSearch(request, function(results,status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          createMapMarker(results[0]);
      }
    });
  });
}

initializeMap.prototype.updateInfo=function(place){
  var service = new google.maps.places.PlacesService(this.map);
  var request = {
    query: place
  };
  var draw=this.draw;

  service.textSearch(request, function(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      loc.lat=Math.round(results[0].geometry.location.lat());
      loc.lon=Math.round(results[0].geometry.location.lng());
      $("#lat").attr("value",loc.lat);
      $("#lon").attr("value",loc.lon);
      draw.updateForecaChart(loc);
    }
  });
}

initializeMap.prototype.fitBounds=function(){
  map.fitBounds(window.mapBounds);
}
