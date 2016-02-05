var Map = function(latLng, zoomLevel, icon){
  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: zoomLevel,
    icon: icon,
  });

  this.addMarker = function(latLng, title){
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      icon: this.googleMap.icon,
      animation: google.maps.Animation.DROP,
      title: title
    });
    this.addInfoWindow(marker);
    return marker;
  },

  this.centreTarget = function(latLng){
    console.log('this', this)
    this.googleMap.panTo(latLng);
  }

  this.bindClick = function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      this.addInfoWindow(
        {lat: event.latLng.lat(), lng: event.latLng.lng()},
        "Javascript: objectively bad");
    }.bind(this));
  },

  this.setCentre = function(latLng){
    this.googleMap.setCenter(latLng);
  },

  this.addInfoWindow = function(marker){
    marker.addListener('click', function(){
      var infoWindow = new google.maps.InfoWindow({
        content: "<h2>"+marker.title+"</h2>"
      });
      infoWindow.open(this.map, marker);
    })
  }
}