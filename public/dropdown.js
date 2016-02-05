var Dropdown = function(){
  this.countryNameList = [],
  this.regionNameList = []

  this.displayDropdown = function(element, array) {
    for (var i = 0; i < array.length; i++) {

      var option = document.createElement("option");
      option.innerText = array[i];
      element.appendChild(option);
    }
  },

  this.buildCountryList = function(request){
    var dropdown = document.querySelector('#Countrylist');
    if (request.status === 200) {
      countriesData = JSON.parse(request.responseText);
      for (var i = 0; i < countriesData.length; i++) {
        this.countryNameList.push(countriesData[i].name);
      };
      this.displayDropdown(dropdown, this.countryNameList);
      // displayCountry(localStorage.getItem('Last country'));  PERSISTENCE
    }
  }


// NOTE THAT THIS NEEDS TO ONLY PUSH IF THIS REGION IS NOT ALREADY IN ARRAY
  this.buildRegionList = function(request){
    var dropdown = document.querySelector('#chartlist')
    if (request.status === 200) {
      countriesData = JSON.parse(request.responseText);
      console.log(countriesData);
      for (var i = 0; i < countriesData.length; i++) {
        this.regionNameList.push(countriesData[i].subregion);
      };
      this.displayDropdown(dropdown, this.regionNameList);
    }
  }
}