var initialize = function(){
  console.log('App started');

  // VARIABLES FOR MAP
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var dropdown = new Dropdown();

// VARIABLES FOR DROPDOWN
var selector = document.getElementById('Countrylist');
var section = document.getElementById('info');
console.log('section', section)


  // VARIABLES FOR MAP
  var centre = {lat: 0, lng: 0};
  var newMarker = {lat: -40.712784, lng: 74.005941};
  var zoom = 4;
  var icon = 'http://www.jasondenio.com/wp-content/uploads/2014/11/mapmarker.png';
  var map = new Map(centre, zoom, icon);

  // VARIABLES FOR GEOLOCATOR

  var locator = new GeoLocator(map);



  request.open('GET', url);

  request.onload = function() {
    dropdown.buildCountryList(request);
  }

  selector.onchange = function(){
    var countryName = this.value;
    var countryIndex = null;

    for(index in dropdown.countryNameList){
      var testCountryName = dropdown.countryNameList[index];
      if(testCountryName === countryName){
        var countryIndex = index;
        console.log(countryIndex);
        displayCountry(countryIndex);
      }
    }
  }

  var displayCountry = function(index){
    var name = countriesData[index]['name'];
    var capital = countriesData[index]['capital'];
    var population = countriesData[index]['population'];
    var lat = countriesData[index]['latlng'][0]
    var lng = countriesData[index]['latlng'][1]
    var latlng = {lat, lng}

    console.log(name, capital, population);


    localStorage.setItem('Last country', index)

    var blockquote = document.createElement('blockquote')
    blockquote.innerText = (name + ' - ' + capital + ' - ' + Number(population).toLocaleString());
    console.log(blockquote);
    console.log(section);
    section.appendChild(blockquote);

    map.centreTarget(latlng);
    map.addMarker(latlng, name);
  }

  request.send(null);

};

window.onload = initialize;