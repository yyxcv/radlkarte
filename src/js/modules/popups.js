import maplibregl from "maplibre-gl";
import {regionLayerNames} from "./layers.js";

export const popup = new maplibregl.Popup();

//we use an adaptation of this in handlePopup: https://maplibre.org/maplibre-gl-js/docs/examples/popup-on-click/

const handlePopup = function (e, map, headline) {

  if (popup.isOpen()) {
    popup.remove();
  }

  const coordinates = e.features[0].geometry.coordinates.slice();
  const description = e.features[0].properties.description || '';

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  const html = `<h1>${headline}</h1>${description}`;

  popup
    .setLngLat(coordinates)
    .setHTML(html)
    .addTo(map);

}

const addPopup = function (map, layerPrefix, headline) {

  for (const regionLayerName of regionLayerNames) {

    const layerName = layerPrefix + regionLayerName;

    map.on('click', layerName, (e) => handlePopup(e, map, headline));
    map.on('mouseenter', layerName, (e) => handlePopup(e, map, headline));
    map.on('mouseenter', layerName, () => map.getCanvas().style.cursor = 'pointer');
    map.on('mouseleave', layerName, () => map.getCanvas().style.cursor = '');
  }
}

const addPopups = function (map) {
  addPopup(map, 'dismount', 'Schiebestelle');
  addPopup(map, 'nocargo', 'Untauglich für Spezialräder');
  addPopup(map, 'nocargo_dismount', 'Schiebestelle / Untauglich für Spezialräder');
}

export default addPopups;
