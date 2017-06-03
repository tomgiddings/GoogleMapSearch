
function getPosition(callback) {
  var geocoder = new google.maps.Geocoder();
  var postcode = document.getElementById("postcode").value;

  geocoder.geocode({'address': postcode}, function(results, status) 
  {   
    if (status == google.maps.GeocoderStatus.OK) 
    {
      callback({
        latt: results[0].geometry.location.lat(),
        long: results[0].geometry.location.lng()
      });
    }
  });
}

function setupMap(latitude, longitude) { 
  // Create the initial map
  var _position = { lat: latitude, lng: longitude};
  var mapOptions = {
    zoom: 12,
    center: _position,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {stylers: [{ visibility: 'simplified' }]},
      {elementType: 'labels', stylers: [{ visibility: 'on' }]}
    ],
    mapTypeControl: false
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // User location marker
  var marker = new google.maps.Marker({
    position: mapOptions.center,
    map: map,
    animation:google.maps.Animation.DROP,
    icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png'
  });

  /*
  * Your marker code goes here
  */
  var marker = new google.maps.Marker({
    position: {lat: 51.515361, lng: -0.128551},
    map: map,
    title: 'Google UK Headquarters',
    url: 'http://www.google.co.uk'
  });

  // Marker details
  var detailsTemplate = "<h2>" + marker.title + "</h2><p><a href='" + marker.url + "'>"+ marker.url +"</a></p>";
  google.maps.event.addListener(marker, 'click', function() { $("#marker-details").html(detailsTemplate) });
}

window.onload = function() {
  // Set up the map with a arbitary centre.
  var map = setupMap(51.5073509, -0.12775829999998223);

  // Try HTML5 geolocation (prompts user)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setupMap(pos.lat, pos.lng);
    }, function() {
    });
  }

  // Alternatively, if a user submits a search, let's find them
  document.getElementById("form").onsubmit = function() {
    getPosition(function(position){
      var text = document.getElementById("text")
      setupMap(position.latt, position.long);
    });
  }
}