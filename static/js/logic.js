// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;
// Creating the map object


// Adding the tile layer
let openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// openstreet.addTo(myMap);

let markers = [];

let url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";
let url2 = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";
// Create the createMap function.
let group_layers = {
  COMING_SOON: L.layerGroup(),
  EMPTY: L.layerGroup(),
  LOW: L.layerGroup(),
  NORMAL: L.layerGroup(),
  OUT_OF_ORDER: L.layerGroup(),
}

let group_icons = {
  COMING_SOON: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "blue",
    shape: "star"
  }),
  EMPTY: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "orange",
    shape: "star"
  }),
  LOW: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  NORMAL: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "green",
    shape: "star"
  }),
  OUT_OF_ORDER: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "red",
    shape: "star"
  }),
}
d3.json(url).then(data=>{
  d3.json(url2).then(status=>{
    let station_status = status.data.stations;
    console.log(station_status);
    console.log(data.data.stations);
    data.data.stations.forEach(element => {
      extra_data = station_status.filter(d=>d.station_id==element.station_id)[0];
      console.log(extra_data);
      if(extra_data.is_installed!=1){
        var marker = L.marker([element.lat, element.lon], {icon: group_icons.COMING_SOON})
        marker.bindPopup(`${element.name}<hr>Capacity: ${element.capacity}`)
        marker.addTo(group_layers.COMING_SOON)
      }else if(extra_data.num_bikes_available==0){
        var marker = L.marker([element.lat, element.lon], {icon: group_icons.EMPTY})
        marker.bindPopup(`${element.name}<hr>Capacity: ${element.capacity}`)
        marker.addTo(group_layers.EMPTY)
      }else if(extra_data.is_renting==0){
        var marker = L.marker([element.lat, element.lon], {icon: group_icons.OUT_OF_ORDER})
        marker.bindPopup(`${element.name}<hr>Capacity: ${element.capacity}`)
        marker.addTo(group_layers.OUT_OF_ORDER)
      }else if(extra_data.num_bikes_available<5){
        var marker = L.marker([element.lat, element.lon], {icon: group_icons.LOW})
        marker.bindPopup(`${element.name}<hr>Capacity: ${element.capacity}`)
        marker.addTo(group_layers.LOW)
      }else{
        var marker = L.marker([element.lat, element.lon], {icon: group_icons.NORMAL})
        marker.bindPopup(`${element.name}<hr>Capacity: ${element.capacity}`)
        marker.addTo(group_layers.NORMAL)
        // markers.push(marker)
      }
      // marker.addTo(myMap);
      
    });
    let markerLayer = L.layerGroup(markers);
    let basMaps = {
      "Street View":street,
      "Topo View":topo
    }
    let overlyMaps = {
      "Coming Soon":group_layers.COMING_SOON,
      "Empty":group_layers.EMPTY,
      "Low":group_layers.LOW,
      "Normal":group_layers.NORMAL,
      "Out of Order":group_layers.OUT_OF_ORDER,
    }
    let myMap = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [street,
        group_layers.COMING_SOON,
        group_layers.LOW,
        group_layers.NORMAL,
      ]
    });
    L.control.layers(basMaps, overlyMaps,
      {
        collapsed: false
      }
    ).addTo(myMap);
  });
  
  
});
// markers


  // Create the tile layer that will be the background of our map.


  // Create a baseMaps object to hold the lightmap layer.


  // Create an overlayMaps object to hold the bikeStations layer.


  // Create the map object with options.


  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.

// Create the createMarkers function.

  // Pull the "stations" property from response.data.

  // Initialize an array to hold the bike markers.

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.

    // Add the marker to the bikeMarkers array.

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.