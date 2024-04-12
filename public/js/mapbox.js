//const locations = JSON.parse(document.getElementById('map').dataset.locations);
export const displayMap = locations => {
maptilersdk.config.apiKey = 'PY3PXHft8zvxM04KPkjZ';
let map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  // center: [16.62662018, 49.2125578], // starting position [lng, lat]
  zoom: -1, // starting zoom
  interactive: false,
});
const bounds = new maptilersdk.LngLatBounds();
locations.forEach((loc) => {
  //create marker

  const el = document.createElement('div');
  el.className = 'marker';
  //add marker
  new maptilersdk.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new maptilersdk.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  // extends the map bounds to include the current locations
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
}