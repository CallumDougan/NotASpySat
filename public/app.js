var initialize = function(){
  console.log('App started');

  // VARIABLES FOR NAVIGATION/LAYOUT
  var mapLink = document.getElementById('map-link');
  var mapView = document.getElementById('map-view');

  var chartLink = document.getElementById('chart-link');
  var chartView = document.getElementById('chart-view');

  var selector = document.getElementById('Countrylist');
  var section = document.getElementById('info');


  // VARIABLES FOR MAP
  var countriesUrl = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var centre = {lat: 0, lng: 0};
  var newMarker = {lat: -40.712784, lng: 74.005941};
  var zoom = 2;
  var icon = 'http://www.jasondenio.com/wp-content/uploads/2014/11/mapmarker.png';
  var map = new Map(centre, zoom, icon);
  var dropdownCountries = new Dropdown();

  // VARIABLES FOR CHART
    var chart = new Highcharts.Chart({
      chart: {
        type: 'line',
        renderTo: container
      },
      title: {
        text: "A title"
      },

      series: [{
        name: "Up?", 
        data: [
        {
          name: "Fire",
          y: 74,
          x: 12,
          color: "#ffac33  "
        },
        {
          name: "Water",
          y: 25,
          x: 6,
          color: "#73b7ff  ",
          sliced: true
        },
        {
          name: "Grass",
          y: 1,
          x: 2,
          color: "#00ba2f  "
        }
        ]
      }]
    });
    console.log(chart);
  var dropdownCharts = new Dropdown();

  // VARIABLES FOR GEOLOCATOR
  var locator = new GeoLocator(map);


  request.open('GET', countriesUrl);

  request.onload = function() {
    dropdownCountries.buildCountryList(request);
  }

  selector.onchange = function(){
    var countryName = this.value;
    var countryIndex = null;

    for(index in dropdownCountries.countryNameList){
      var testCountryName = dropdownCountries.countryNameList[index];
      if(testCountryName === countryName){
        var countryIndex = index;
        console.log(countryIndex);
        displayCountry(countryIndex);
      }
    }
  }

  mapLink.onclick = function(){
    chartView.style.display = 'none';
    mapView.style.display = 'block';
  }

  chartLink.onclick = function(){
    console.log("I'm clicked");
    mapView.style.display = 'none';
    chartView.style.display = 'block';
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