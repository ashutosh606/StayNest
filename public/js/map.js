
   
// 	mapboxgl.accessToken = mapToken;

//     const map = new mapboxgl.Map({
//         container: 'map', // container ID
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//         zoom: 8// starting zoom
//     });


//      const marker = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(coordinates)  // Ensure coordinates are [lng, lat]
//   .setPopup(new mapboxgl.Popup({ offset: 25 })
//   .setHTML(`<p>Exact location provided after booking!</p>`))

//   .addTo(map);





mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
 center: listing.geometry.coordinates, // starting position [lng, lat]
 style: 'mapbox://styles/mapbox/streets-v9', 
 zoom: 6 // starting zoom
});


// Create a new marker.
const marker = new mapboxgl.Marker({color : "red"})
.setLngLat(listing.geometry.coordinates) //listing/geomertyu / coordinatre
.setPopup(new mapboxgl.Popup({offset: 25})

.setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking!</p>`))
.addTo(map);



