import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';

import sources from "./sources"
import layers from "./layers";
import * as mapboxgl from "maplibre-gl";
import addPopups from "./popups.js";
import LayerControl from "./controls/LayerControl.js";

function init() {

  const map = new maplibregl.Map({
      container: 'map',
      style: {
        "version": 8,
        "name": "Positron",
        "metadata": {},
        "sources": sources,
        "sprite": "./image/sprite",
        "glyphs": "https://tiles.basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf",
        "layers": layers
      },
      center: [16.37, 48.21],
      zoom: 12,
      hash: true
    }
  );

  map.addControl(new LayerControl());
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true
  }));
  map.addControl(new mapboxgl.NavigationControl());


  addPopups(map);

}


export default init;
