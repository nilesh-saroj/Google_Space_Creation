function a2c(address){
  var address = "104, Raghuveer textile mall, Aai Mata Rd, behind DR World mall, Dumbhal, chowk, Surat, Gujarat 395010";
  var geo = Maps.newGeocoder().geocode(address);
  var loc = geo.results[0].geometry.location;
  Logger.log(loc.lat + ',' + loc.lng)


 
var lat = loc.lat ;
var long = loc.lng ;

  var response = Maps.newGeocoder().reverseGeocode(lat, long);
  var address1 = response['results'][0]['formatted_address']
  
Logger.log(address1)
  return address1
  
}
