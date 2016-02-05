var Dropdown = function(){
  this.countryNameList = [],

  this.displayDropdown = function(countryNameList) {
    for (var i = 0; i < countryNameList.length; i++) {

      var option = document.createElement("option");
      option.innerText = countryNameList[i];

      var select = document.querySelector("select");
      select.appendChild(option);
    }
  },

  this.buildCountryList = function(request){
    if (request.status === 200) {
      console.log("got the data");
      countriesData = JSON.parse(request.responseText);
      
      
      for (var i = 0; i < countriesData.length; i++) {
        this.countryNameList.push(countriesData[i].name);
      };
      this.displayDropdown(this.countryNameList);
      // displayCountry(localStorage.getItem('Last country'));  PERSISTENCE
    }
  }
}