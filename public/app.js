var initialize = function(){
  console.log('App started');

  // VARIABLES FOR NAVIGATION/LAYOUT
  var mapLink = document.getElementById('map-link');
  var mapView = document.getElementById('map-view');

  var chartLink = document.getElementById('chart-link');
  var chartView = document.getElementById('chart-view');

  var countrySelector = document.getElementById('Countrylist');
  var regionSelector = document.getElementById('chartlist')
  var section = document.getElementById('info');


  // VARIABLES FOR MAP/CHART
  var countriesUrl = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var centre = {lat: 0, lng: 0};
  var newMarker = {lat: -40.712784, lng: 74.005941};
  var zoom = 2;
  var icon = 'http://www.jasondenio.com/wp-content/uploads/2014/11/mapmarker.png';
  var map = new Map(centre, zoom, icon);
  var dropdownCountries = new Dropdown();
  var dropdownRegions = new Dropdown();
  var chart = new Highcharts.Chart({
    chart: {
      type: 'bar',
      renderTo: container
    },
    title: {
      text: 'Historic World Population by Region'
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' millions'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Year 1800',
      data: [107, 31, 635, 203, 2]
    }, {
      name: 'Year 1900',
      data: [133, 156, 947, 408, 6]
    }, {
      name: 'Year 2012',
      data: [1052, 954, 4250, 740, 38]
    }]
  });
console.log(chart);

  // VARIABLES FOR GEOLOCATOR
  var locator = new GeoLocator(map);


  request.open('GET', countriesUrl);

  request.onload = function() {
    dropdownCountries.buildCountryList(request);
    dropdownRegions.buildRegionList(request);
  }

  countrySelector.onchange = function(){
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
  regionSelector.onchange = function(){
    var regionName = this.value;
    var regionIndex = null;

    for(index in dropdownRegions.regionNameList){
      var testRegionName = dropdownRegions.regionNameList[index];
      if(testRegionName === regionName){
        var regionIndex = index;
        console.log(regionIndex);
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