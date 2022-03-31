// let map
// var myLat = 0
// var myLng = 0
// var icon = "car.png"
// var availableCars = {}
// var minDistance = Number.MAX_SAFE_INTEGER


// initMap = () => {
//   map = new google.maps.Map(document.getElementById("map"), {
//   center: { lat: 42.352271, lng: -71.05524200000001 },
//   zoom: 4,
//   })
//  // getLocation()
// }
console.log("test")
let map
initMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 42.406949, lng:  -71.11982 },
  zoom: 16,
  })
  getLocation()
}




getLocation = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      myLat = position.coords.latitude
      myLng = position.coords.longitude
      //getCars()
    })
  }
}

// getCars = () => {
//   var me = new google.maps.LatLng(myLat, myLng)
//   var distance = {}
//   var closestCar = {}

//   request = new XMLHttpRequest();


//   request.open("POST",  "https://immense-woodland-80683.herokuapp.com/rides", true)

//   request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

//   request.onreadystatechange = () => {

//     if(request.readyState == 4){
//       availableCars = JSON.parse(request.responseText)
//       for (var i = 0; i < availableCars.length; i++) {

//         var nearbyCars = new google.maps.Marker({
//         position: new google.maps.LatLng(availableCars[i].lat, availableCars[i].lng),
//         icon: icon,
//         map: map,
//         })

//         //store distances in array
//         var carPosition = new google.maps.LatLng(availableCars[i].lat, availableCars[i].lng)
//         distance = google.maps.geometry.spherical.computeDistanceBetween(me,carPosition) * 0.00062137
//         if (distance < minDistance) {
//           minDistance = distance
//           closestCar = availableCars[i]
//         }
//       }

//       //polyline
//       var pathCoordinates = [
//         {lat: myLat, lng: myLng },
//         {lat: closestCar.lat, lng: closestCar.lng },
//         ]

//       var polyline = new google.maps.Polyline({
//         path: pathCoordinates,
//         geodesic: true,
//         strokeColor: "#FF0000",
//         strokeOpacity: 1.0,
//         strokeWeight: 5,
//       })

//       polyline.setMap(map)
//       renderMap(closestCar)
//     }
//   }
//     request.send("username=jLttbNzY&lat=" + myLat +"&lng="+ myLng)
// }


// renderMap = (closestCar) => {
//   var me = new google.maps.Marker({
//     position: {lat: myLat, lng: myLng},
//     map: map,
//   })

//   var infowindow = new google.maps.InfoWindow({
//     content: "closest car with username " + closestCar.username + " " + Math.round(minDistance) + " miles away",
//   })

//   me.addListener("click", () => {
//     infowindow.open({
//       anchor: me,
//       map: map,
//       shouldFocus: false,
//     })
//   })
// }