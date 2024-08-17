import L from "leaflet";
import 'leaflet-control-geocoder';
import 'leaflet.locatecontrol';
import 'leaflet-sidebar-v2';
import 'leaflet-polylineDecorator';
import '@turf/turf';
import 'opening_hours';
import $ from "jquery";

import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import 'leaflet-sidebar-v2/css/leaflet-sidebar.min.css';

window.$ = $;

//TODO: make the customized version work
//import './leaflet-hash-1.0.1-customized/leaflet-hash.js'

/** global variable for radlkarte properties / data storage */
var rk = {};
/** the main leaflet map */
rk.leafletMap = undefined;
rk.geocodingControl = undefined;
/** object holding all linestring and decorator layers (the key represents the properties) */
rk.segments = {};
rk.poiLayers = {};
/** layer group holding currently active variant of problem icons */
rk.poiLayers.problemLayerActive = L.layerGroup();
/** layer group holding problem icons for low zoom levels */
rk.poiLayers.problemLayerLowZoom = L.layerGroup();
/** layer group holding problem icons for high zoom levels */
rk.poiLayers.problemLayerHighZoom = L.layerGroup();
/** layer group holding bike sharing icons */
rk.poiLayers.bikeShareLayer = L.layerGroup();
rk.osmPoiTypes = {
  transit: { urlKey: "o", name: "ÖV-Station", layerName: "Öffentlicher Verkehr" },
  bicycleShop: { urlKey: "f", name: "Fahrradgeschäft", layerName: "Fahrradgeschäfte" },
  bicycleRepairStation: { urlKey: "r", name: "Reparaturstation", layerName: "Reparaturstationen" },
  bicyclePump: { urlKey: "l", name: "Luftpumpe", layerName: "Luftpumpen" },
  bicycleTubeVending: { urlKey: "s", name: "Schlauchomat", layerName: "Schlauchomaten" },
  drinkingWater: { urlKey: "w", name: "Trinkwasser", layerName: "Trinkwasser" },
};
for (const [k, v] of Object.entries(rk.osmPoiTypes)) {
  v.layer = L.layerGroup();
  rk.poiLayers[k] = v.layer;
}
/** names of all different levels of priorities (ordered descending by priority) */
rk.priorityStrings = ["Überregional", "Regional", "Lokal"];
rk.stressStrings = ["Ruhig", "Durchschnittlich", "Stressig"];
rk.debug = true;
rk.fullWidthThreshold = 768;

// style: stress = color, priority = line width
rk.styleFunction = updateStyles;
rk.tileLayerOpacity = 1;
rk.priorityFullVisibleFromZoom = [0, 14, 15];
rk.priorityReducedVisibilityFromZoom = [0, 12, 14];
rk.onewayIconThreshold = 12;
rk.problemIconThreshold = 14;
rk.lineWidthFactor = [1.6, 0.6, 0.3];
rk.arrowWidthFactor = [2, 3, 3];
rk.opacity = 0.62;
rk.colors = ['#004B67', '#51A4B6', '#FF6600']; // dark blue - light blue - orange

rk.autoSwitchDistanceMeters = 55000;
rk.defaultRegion = 'wien';
rk.currentRegion = undefined;
rk.defaultZoom = 14;
rk.configurations = {
  'rendertest': {
    title: '[DEV] Rendertest',
    centerLatLng: L.latLng(50.09, 14.39),
  },
  'klagenfurt': {
    title: 'Klagenfurt',
    centerLatLng: L.latLng(46.62, 14.31),
    nextbikeUrl: 'https://maps.nextbike.net/maps/nextbike.json?domains=ka&bikes=false'
  },
  'linz': {
    title: 'Linz',
    centerLatLng: L.latLng(48.30, 14.26),
    nextbikeUrl: 'https://maps.nextbike.net/maps/nextbike.json?domains=al&bikes=false'
  },
  'rheintal': {
    title: 'Rheintal',
    centerLatLng: L.latLng(47.41, 9.72),
  },
  'schwarzatal': {
    title: 'Schwarztal',
    centerLatLng: L.latLng(47.67, 15.94),
    nextbikeUrl: 'https://maps.nextbike.net/maps/nextbike.json?domains=la&bikes=false'
  },
  'steyr': {
    title: 'Steyr',
    centerLatLng: L.latLng(48.04, 14.42),
  },
  'wien': {
    title: 'Wien',
    centerLatLng: L.latLng(48.21, 16.37),
    nextbikeUrl: 'https://maps.nextbike.net/maps/nextbike.json?domains=wr,la&bikes=false',
  },
};
rk.pageHeader = function () {
  return $('h1');
}

function debug(obj) {
  if (rk.debug) {
    console.log(obj);
  }
}

/**
 * set the currently active region.
 * called from the CUSTOMIZED hash plugin
 * (when region is changed e.g. via hyperlink or by changing the URL)
 */
function updateRadlkarteRegion(region) {
  rk.currentRegion = region;
  let configuration = rk.configurations[region];
  if (configuration === undefined) {
    console.warn('ignoring unknown region ' + region);
    return;
  }

  removeAllSegmentsAndMarkers();
  loadGeoJson('data/radlkarte-' + region + '.geojson');
  // POI layers: only reload visible layers
  if (rk.leafletMap.hasLayer(rk.poiLayers.bikeShareLayer)) {
    clearAndLoadNextbike(configuration.nextbikeUrl);
  }
  let visibleOsmPois = [];
  for (const [k, v] of Object.entries(rk.osmPoiTypes)) {
    if (rk.leafletMap.hasLayer(v.layer)) {
      visibleOsmPois.push(k);
    }
  }
  clearAndLoadOsmPois(visibleOsmPois);

  rk.pageHeader().text('Radlkarte ' + configuration.title);


  // virtual page hit in matomo analytics
  _paq.push(['setCustomUrl', '/' + region]);
  _paq.push(['setDocumentTitle', region]);
  _paq.push(['trackPageView']);
}

function removeAllSegmentsAndMarkers() {
  // we can't simply delete all layers (otherwise the base layer is gone as well)
  // TODO refactor?
  for (const key of Object.keys(rk.segments)) {
    rk.leafletMap.removeLayer(rk.segments[key].lines);
    if (rk.segments[key].steepLines && rk.leafletMap.hasLayer(rk.segments[key].steepLines)) {
      rk.leafletMap.removeLayer(rk.segments[key].steepLines);
    }
    rk.leafletMap.removeLayer(rk.segments[key].decorators);
  }
  rk.segments = {};

  for (const [k, v] of Object.entries(rk.osmPoiTypes)) {
    v.layer.clearLayers();
  }
}

function loadGeoJson(file) {
  rk.poiLayers.problemLayerLowZoom.clearLayers();
  rk.poiLayers.problemLayerHighZoom.clearLayers();
  $.getJSON(file, function (data) {
    if (data.type != "FeatureCollection") {
      console.error("expected a GeoJSON FeatureCollection. no radlkarte network can be displayed.");
      return;
    }

    if (!data.bbox) {
      console.warn("no bbox defined in GeoJSON - can not configure geocoding");
      rk.geocodingControl.options.geocoder.options.geocodingQueryParams.bounds = null;
    } else {
      rk.geocodingControl.options.geocoder.options.geocodingQueryParams.bounds = data.bbox.join(",");
    }

    // collect geojson linestring features (and marker points)
    let ignoreCount = 0;
    let goodCount = 0;
    let poiCount = 0;
    let categorizedLinestrings = {};
    for (let i = 0; i < data.features.length; i++) {
      let geojson = data.features[i];
      if (geojson.type != 'Feature' || geojson.properties == undefined || geojson.geometry == undefined || geojson.geometry.type != 'LineString' || geojson.geometry.coordinates.length < 2) {
        if (geojson.geometry.type == 'Point') {
          let problemMarkers = createProblemMarkersIncludingPopup(geojson);
          if (problemMarkers != null) {
            rk.poiLayers.problemLayerLowZoom.addLayer(problemMarkers.lowZoom);
            rk.poiLayers.problemLayerHighZoom.addLayer(problemMarkers.highZoom);
            ++poiCount;
          } else {
            console.warn("ignoring invalid point (not a problem marker): " + JSON.stringify(geojson));
            ++ignoreCount;
          }
        } else {
          console.warn("ignoring invalid object (not a proper linestring feature): " + JSON.stringify(geojson));
          ++ignoreCount;
        }
        continue;
      }

      let priority = parseInt(geojson.properties.priority, 10);
      let stress = parseInt(geojson.properties.stress, 10);
      if (isNaN(priority) || isNaN(stress)) {
        console.warn("ignoring invalid object (priority / stress not set): " + JSON.stringify(geojson));
        ++ignoreCount;
        continue;
      }

      // collect linestrings by category
      addSegmentToObject(categorizedLinestrings, geojson);

      ++goodCount;
    }
    debug("processed " + goodCount + " valid LineString features, " + poiCount + " Point features, and " + ignoreCount + " ignored features.");

    // merge geojson linestring features
    // with the same properties into a single multilinestring
    // and then put them in a leaflet layer
    for (const key of Object.keys(categorizedLinestrings)) {
      let multilinestringFeatures = turf.combine(turf.featureCollection(categorizedLinestrings[key]));
      let properties = JSON.parse(key);
      multilinestringFeatures.properties = properties;

      let decoratorCoordinates = [];
      for (const linestring of categorizedLinestrings[key]) {
        decoratorCoordinates.push(turf.flip(linestring).geometry.coordinates);
      }

      // separate panes to allow setting zIndex, which is not possible on
      // the geojson layers themselves
      // see https://stackoverflow.com/q/39767499/1648538
      rk.leafletMap.createPane(key);
      rk.leafletMap.getPane(key).style.zIndex = getSegmentZIndex(properties);
      rk.segments[key] = {
        'lines': L.geoJSON(multilinestringFeatures, { pane: key }),
        'steepLines': properties.steep === 'yes' ? L.geoJSON(multilinestringFeatures, { pane: key }) : undefined,
        'decorators': L.polylineDecorator(decoratorCoordinates)
      };
    }

    // apply styles
    rk.styleFunction();

    rk.leafletMap.on('zoomend', function (ev) {
      //debug("zoom level changed to " + rk.leafletMap.getZoom() + ".. enqueueing style change");
      $("#map").queue(function () {
        rk.styleFunction();
        $(this).dequeue();
      });
    });
  });
}

/**
 * @returns a key representing activated layers with one char each. x means no active layer.
 */
function getSelectedPoiLayerKey() {
  let selected = "";
  if (rk.leafletMap.hasLayer(rk.poiLayers.problemLayerActive)) {
    selected += 'p';
  }
  if (rk.leafletMap.hasLayer(rk.poiLayers.bikeShareLayer)) {
    selected += 'b';
  }
  for (const type in rk.osmPoiTypes) {
    if (rk.leafletMap.hasLayer(rk.poiLayers[type])) {
      selected += rk.osmPoiTypes[type].urlKey;
    }
  }
  if (selected.length == 0) {
    selected = "x";
  }
  return selected;
}

function selectPoiLayersForKey(key) {
  if (key.includes("p")) {
    rk.leafletMap.addLayer(rk.poiLayers.problemLayerActive);
  } else {
    rk.leafletMap.removeLayer(rk.poiLayers.problemLayerActive);
  }
  if (key.includes("b")) {
    rk.leafletMap.addLayer(rk.poiLayers.bikeShareLayer);
  } else {
    rk.leafletMap.removeLayer(rk.poiLayers.bikeShareLayer);
  }
  for (const type in rk.osmPoiTypes) {
    if (key.includes(rk.osmPoiTypes[type].urlKey)) {
      rk.leafletMap.addLayer(rk.poiLayers[type]);
    } else {
      rk.leafletMap.removeLayer(rk.poiLayers[type]);
    }
  }
}

/**
 * use nextbike API to get stations and current nr of bikes.
 * API doc: https://github.com/nextbike/api-doc/blob/master/maps/nextbike-maps.openapi.yaml
 * List of all cities (to easily get domain code): https://maps.nextbike.net/maps/nextbike.json?list_cities=1
 */
function clearAndLoadNextbike(url) {
  rk.poiLayers.bikeShareLayer.clearLayers();
  $.getJSON(url, function (data) {
    for (const country of data.countries) {
      for (const city of country.cities) {
        let cityUrl = `<a href="${city.website}" target="_blank">Nextbike ${city.name}</a>`;
        for (const place of city.places) {
          let markerLayer = createNextbikeMarkerIncludingPopup(country.domain, place, cityUrl);
          if (markerLayer != null) {
            rk.poiLayers.bikeShareLayer.addLayer(markerLayer);
          }
        }
      }
    }
  });
}

/**
 * @param domain 2-letter Nextbike domain for determining special icons (optional).
 * @param place JSON from Nextbike API describing a bike-share station.
 */
function createNextbikeMarkerIncludingPopup(domain, place, cityUrl) {
  let description = '<h2>' + place.name + '</h2>';
  if (place.bikes === 1) {
    description += "<p>1 Rad verfügbar</p>";
  } else {
    description += `<p>${place.bikes} Räder verfügbar</p>`;
  }
  description += `<p class="sidenote">Mehr Informationen: ${cityUrl}</p>`;

  let icon = place.bikes !== 0 ? rk.icons.nextbike : rk.icons.nextbikeGray;
  if (domain === "wr") {
    icon = place.bikes !== 0 ? rk.icons.wienmobilrad : rk.icons.wienmobilradGray;
  } else if (domain === "al") {
    icon = place.bikes !== 0 ? rk.icons.citybikelinz : rk.icons.citybikelinzGray;
  }

  return createMarkerIncludingPopup(L.latLng(place.lat, place.lng), icon, description, place.name);
}

function createMarkerIncludingPopup(latLng, icon, description, altText) {
  let marker = L.marker(latLng, {
    icon: icon,
    alt: altText,
  });
  marker.bindPopup(`<article class="tooltip">${description}</article>`, { closeButton: true });
  marker.on('mouseover', function () {
    marker.openPopup();
  });
  // adding a mouseover event listener causes a problem with touch browsers:
  // then two taps are required to show the marker.
  // explicitly adding the click event listener here solves the issue
  marker.on('click', function () {
    marker.openPopup();
  });
  return marker;
}

/** expects a list of poi types */
function clearAndLoadOsmPois(types) {
  for (const type of types) {
    if (type === "transit") {
      clearAndLoadTransit(rk.currentRegion);
    } else {
      clearAndLoadBasicOsmPoi(type, rk.currentRegion);
    }
  }
}

/** special handling for transit because we need to merge subway and railway in one layer */
async function clearAndLoadTransit(region) {
  rk.poiLayers.transit.clearLayers();
  const seen = new Set();

  for (const transitType of ["subway", "railway"]) {
    if (transitType === "subway" && region !== "wien") {
      continue;
    }
    const stationName2Line2Colour = await loadStationName2Line2Colour(region, `data/osm-overpass/${region}-${transitType}Lines.json`);
    let transitFile = `data/osm-overpass/${region}-${transitType}.json`;
    $.getJSON(transitFile, function (data) {
      for (const element of data.elements) {
        if (seen.has(element.tags.name)) {
          // filter duplicate stations (happens when multiple lines cross)
          continue;
        }
        let latLng = "center" in element ? L.latLng(element.center.lat, element.center.lon) : L.latLng(element.lat, element.lon);
        if (latLng == null) {
          // L.latLng can return null/undefined for invalid lat/lon values, catch this here
          console.warn("invalid lat/lon for " + element.type + " with OSM id " + element.id);
          continue;
        }
        let description = `<h2>${element.tags.name}</h2>`;
        let icon = rk.icons[transitType];
        if (stationName2Line2Colour[element.tags.name] != null) {
          let refs = Array.from(Object.keys(stationName2Line2Colour[element.tags.name])).sort();
          for (const ref of refs) {
            description += `<span class="transitLine" style="background-color:${stationName2Line2Colour[element.tags.name][ref]};">${ref}</span>\n`;
          }

          if (transitType === "railway") {
            icon = rk.icons.sbahn;
          }
        }
        let altText = element.tags.name;
        const markerLayer = createMarkerIncludingPopup(latLng, icon, description, altText);
        if (markerLayer != null) {
          seen.add(element.tags.name);
          rk.poiLayers.transit.addLayer(markerLayer);
        }
      }
      debug('created ' + seen.size + ' ' + transitType + ' icons.');
    });
  }
}

async function loadStationName2Line2Colour(region, fileName) {
  const stationName2Line2Colour = {};
  $.getJSON(fileName, function (data) {
    for (const element of data.elements) {
      if (stationName2Line2Colour[element.tags.name] == null) {
        stationName2Line2Colour[element.tags.name] = {};
      }
      stationName2Line2Colour[element.tags.name][element.tags.ref] = element.tags.colour;
    }
  });
  return stationName2Line2Colour;
}

function clearAndLoadBasicOsmPoi(type, region) {
  rk.poiLayers[type].clearLayers();
  let poiFile = "data/osm-overpass/" + region + "-" + type + ".json";
  $.getJSON(poiFile, function (data) {
    let count = 0;
    let dataDate = extractDateFromOverpassResponse(data);
    for (const element of data.elements) {
      const latLng = "center" in element ? L.latLng(element.center.lat, element.center.lon) : L.latLng(element.lat, element.lon);
      if (latLng == null) {
        // L.latLng can return null/undefined for invalid lat/lon values, catch this here
        console.warn("invalid lat/lon for " + type + " with OSM id " + element.id);
        continue;
      }
      const tags = element.tags;

      const access = tags.access;
      if (["no", "private", "permit"].includes(access)) {
        continue;
      }

      const name = tags.name;
      const website = extractWebsiteFromTagSoup(tags);
      let heading = name != null ? name : rk.osmPoiTypes[type].name;
      if (website != null) {
        heading = `<a href="${website}" target="_blank">${heading}</a>`;
      }
      let description = `<h2>${heading}</h2>`;

      const address = extractAddressFromTagSoup(tags);
      if (address) {
        description += `<p>${address}</p>`;
      }

      let currentlyOpen = type === 'bicycleShop' ? false : true;
      let opening_hours_value = tags.opening_hours;
      if (opening_hours_value) {
        if (type === "bicycleShop" && !opening_hours_value.includes("PH")) {
          // bicycle shops are usually closed on holidays but this is rarely mapped
          opening_hours_value += ";PH off";
        }
        // NOTE: state left empty because school holidays are likely not relevant (not a single mapped instance in our data set)
        // noinspection JSPotentiallyInvalidConstructorUsage
        const oh = new opening_hours(opening_hours_value, {
          lat: latLng.lat,
          lon: latLng.lng,
          address: { country_code: "at", state: "" }
        });
        currentlyOpen = oh.getState();
        const openText = currentlyOpen ? "jetzt geöffnet" : "derzeit geschlossen";
        let items = oh.prettifyValue({ conf: { locale: 'de' }, }).split(";");

        for (let i = 0; i < items.length; i++) {
          items[i] = items[i].trim();
          if (type === "bicycleShop" && items[i] === "Feiertags geschlossen") {
            // avoid redundant info
            items[i] = "";
          } else {
            items[i] = `<li>${items[i]}</li>`;
          }
        }
        const itemList = "<ul>" + items.join("\n") + "</ul>";
        description += `<p>Öffnungszeiten (${openText}):</p>${itemList}`;
      }

      const phone = tags.phone != null ? tags.phone : tags["contact:phone"];
      if (phone) {
        description += `<p>${phone}</p>`;
      }

      const operator = tags.operator;
      if (operator) {
        description += `<p class="sidenote">Betreiber: ${operator}</p>`;
      }

      const osmLink = `<a href="https://www.osm.org/${element.type}/${element.id}" target="_blank">Quelle: OpenStreetMap</a>`;
      description += `<p class="sidenote">${osmLink} (Stand: ${dataDate})</p>`;

      let icon = rk.icons[`${type}${currentlyOpen ? "" : "Gray"}`];
      let altText = element.tags.name;
      const markerLayer = createMarkerIncludingPopup(latLng, icon, description, altText);
      if (markerLayer != null) {
        rk.poiLayers[type].addLayer(markerLayer);
        count++;
      }
    }
    debug('created ' + count + ' ' + type + ' icons.');
  });
}

function extractDateFromOverpassResponse(data) {
  if (data.osm3s && data.osm3s.timestamp_osm_base) {
    if (typeof data.osm3s.timestamp_osm_base === 'string') {
      return data.osm3s.timestamp_osm_base.split("T")[0];
    }
  }
  return null;
}

function extractAddressFromTagSoup(tags) {
  if (tags["addr:street"] != null) {
    let address = "";
    address += tags["addr:street"];
    if (tags["addr:housenumber"] != null) {
      address += " " + tags["addr:housenumber"];
    }
    if (tags["addr:postcode"] != null) {
      address += ", " + tags["addr:postcode"];
      if (tags["addr:city"] != null) {
        address += " " + tags["addr:city"];
      }
    } else if (tags["addr:city"] != null) {
      address += ", " + tags["addr:city"];
    }
    return address;
  }
  return undefined;
}

function extractWebsiteFromTagSoup(tags) {
  let website = tags.website != null ? tags.website : tags["contact:website"];
  if (website == null) {
    return website;
  }
  if (!website.startsWith("http")) {
    website = `http://${website}`;
  }
  return website;
}

/**
 * Get a zIndex based on priority and stress
 * where low-stress high-priority is on the top
 */
function getSegmentZIndex(properties) {
  // 400 is the default zIndex for overlayPanes, stay slightly below this level
  let index = 350;
  index += 10 * (rk.priorityStrings.length - properties.priority);
  index += 1 * (rk.stressStrings.length - properties.stress);
  return index;
}

function addSegmentToObject(object, geojsonLinestring) {
  let key = getSegmentKey(geojsonLinestring);
  let keyString = JSON.stringify(key);
  if (object[keyString] === undefined) {
    object[keyString] = [];
  }
  object[keyString].push(geojsonLinestring);
}

/*
 * Get a JSON object as key for a segment linestring.
 * This object explicitly contains all values to be used in styling
 */
function getSegmentKey(geojsonLinestring) {
  let properties = geojsonLinestring.properties;
  return {
    "priority": properties.priority,
    "stress": properties.stress,
    "oneway": properties.oneway === undefined ? 'no' : properties.oneway,
    "unpaved": properties.unpaved === undefined ? 'no' : properties.unpaved,
    "steep": properties.steep === undefined ? 'no' : properties.steep
  };
}

/**
 * Updates the styles of all layers. Takes current zoom level into account.
 * Special styles for unpaved, steep, oneway arrows are matched, take care in future adapations
 */
function updateStyles() {
  let zoom = rk.leafletMap.getZoom();
  for (const key of Object.keys(rk.segments)) {
    let properties = JSON.parse(key);
    let showFull = zoom >= rk.priorityFullVisibleFromZoom[properties.priority];
    let showMinimal = zoom < rk.priorityFullVisibleFromZoom[properties.priority] && zoom >= rk.priorityReducedVisibilityFromZoom[properties.priority];

    let lineStyle;
    if (showFull) {
      lineStyle = getLineStyle(zoom, properties);
    } else if (showMinimal) {
      lineStyle = getLineStyleMinimal(properties);
    }

    let lines = rk.segments[key].lines;
    if (showFull || showMinimal) {
      lines.setStyle(lineStyle);
      rk.leafletMap.addLayer(lines);
    } else {
      rk.leafletMap.removeLayer(lines);
    }

    // steep lines are drawn twice, once regular,
    // a second time as bristles (that's what this copy is for)
    let steepLines = rk.segments[key].steepLines;
    if (steepLines !== undefined) {
      if (showFull || showMinimal) {
        let steepLineStyle;
        if (showFull) {
          steepLineStyle = getSteepLineStyle(zoom, properties);
        } else {
          steepLineStyle = getSteepLineStyleMinimal(properties);
        }
        steepLines.setStyle(steepLineStyle);
        rk.leafletMap.addLayer(steepLines);
      } else {
        rk.leafletMap.removeLayer(steepLines);
      }
    }

    let decorators = rk.segments[key].decorators;
    if ((showFull || showMinimal) && zoom >= rk.onewayIconThreshold && properties.oneway === 'yes') {
      decorators.setPatterns(getOnewayArrowPatterns(zoom, properties, lineStyle.weight));
      rk.leafletMap.addLayer(decorators);
    } else {
      rk.leafletMap.removeLayer(decorators);
    }
  }

  if (zoom >= rk.problemIconThreshold) {
    rk.poiLayers.problemLayerActive.clearLayers();
    rk.poiLayers.problemLayerActive.addLayer(rk.poiLayers.problemLayerHighZoom);
  } else {
    rk.poiLayers.problemLayerActive.clearLayers();
    rk.poiLayers.problemLayerActive.addLayer(rk.poiLayers.problemLayerLowZoom);
  }
}

function getLineStyle(zoom, properties) {
  let lineWeight = getLineWeight(zoom, properties.priority);
  return _getLineStyle(lineWeight, properties);
}

function getLineStyleMinimal(properties) {
  let lineWeight = 1;
  return _getLineStyle(lineWeight, properties);
}

function _getLineStyle(lineWeight, properties) {
  let style = {
    color: rk.colors[properties.stress],
    weight: lineWeight,
    opacity: rk.opacity
  };
  if (properties.unpaved === 'yes') {
    style.dashArray = getUnpavedDashStyle(Math.max(2, lineWeight));
  }
  return style;
}

function getSteepLineStyle(zoom, properties) {
  let lineWeight = getLineWeight(zoom, properties.priority);
  return _getSteepLineStyle(lineWeight, properties);
}

function getSteepLineStyleMinimal(properties) {
  let lineWeight = 1;
  return _getSteepLineStyle(lineWeight, properties);
}

function _getSteepLineStyle(lineWeight, properties) {
  let steepBristleLength = 2;
  return {
    color: rk.colors[properties.stress],
    weight: lineWeight * 2,
    opacity: rk.opacity,
    lineCap: 'butt',
    dashArray: getSteepDashStyle(Math.max(2, lineWeight), steepBristleLength),
    dashOffset: Math.max(2, lineWeight) * -0.5 + steepBristleLength / 2
  };
}

/**
 * weight aka width of a line
 */
function getLineWeight(zoom, priority) {
  let lineWeight = zoom - 10;
  lineWeight = (lineWeight <= 0 ? 1 : lineWeight) * 1.4;
  lineWeight *= rk.lineWidthFactor[priority];
  return lineWeight;
}

function getUnpavedDashStyle(lineWeight) {
  return lineWeight + " " + lineWeight * 1.5;
}

function getSteepDashStyle(lineWeight, steepBristleLength) {
  return steepBristleLength + " " + (lineWeight * 2.5 - steepBristleLength);
}

/**
 * @return an array of patterns as expected by L.PolylineDecorator.setPatterns
 */
function getOnewayArrowPatterns(zoom, properties, lineWeight) {
  let arrowWidth = Math.max(5, lineWeight * rk.arrowWidthFactor[properties.priority]);
  return [{
    offset: arrowWidth - 2,
    repeat: Math.max(2, lineWeight) * 5,
    symbol: L.Symbol.arrowHead({
      pixelSize: arrowWidth,
      headAngle: 90,
      pathOptions: {
        color: rk.colors[properties.stress],
        fillOpacity: rk.opacity,
        weight: 0
      }
    })
  }];
}

function loadLeaflet() {
  rk.leafletMap = L.map('map', { 'zoomControl': false });

  // avoid troubles with min/maxZoom from our layer group, see https://github.com/Leaflet/Leaflet/issues/6557
  let minMaxZoomLayer = L.gridLayer({
    minZoom: 0,
    maxZoom: 19
  });
  let cartodbPositronLowZoom = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a> contributors | &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 15
  });
  let osmHiZoom = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 16,
    maxZoom: 19,
    // low and high zoom layer contributions are combined, so skip it here
    //attribution: 'map data &amp; imagery &copy; <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors'
  });
  let mixed = L.layerGroup([minMaxZoomLayer, cartodbPositronLowZoom, osmHiZoom]);

  let basemapAtOrthofoto = L.tileLayer('https://maps{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.{format}', {
    maxZoom: 18, // up to 20 is possible
    attribution: '<a href="https://www.basemap.at" target="_blank">basemap.at</a>',
    subdomains: ["", "1", "2", "3", "4"],
    format: 'jpeg',
    bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
  });
  let ocm = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=ab5e4b2d24854fefb139c538ef5187a8', {
    minZoom: 0,
    maxZoom: 18,
    attribution: '&copy; <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors | &copy; <a href="https://www.thunderforest.com" target="_blank">Thunderforest</a>'
  });
  let cyclosm = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 18,
    attribution: '&copy; <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors | <a href="https://www.cyclosm.org" target="_blank">CyclOSM</a> | <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap Frankreich</a>.'
  });
  let empty = L.tileLayer('', { attribution: '' });

  /*let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'map data &amp; imagery &copy; <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors'
  });*/

  let baseMaps = {
    "Straßenkarte": mixed,
    "Luftbild": basemapAtOrthofoto,
    "CyclOSM": cyclosm,
    "OpenCycleMap": ocm,
    //"OpenStreetMap": osm,
    "Weiß": empty,
  };
  let overlayMaps = {
    "Problemstellen": rk.poiLayers.problemLayerActive,
    "Leihräder": rk.poiLayers.bikeShareLayer
  };
  for (const [k, v] of Object.entries(rk.osmPoiTypes)) {
    overlayMaps[v.layerName] = v.layer;
  }

  mixed.addTo(rk.leafletMap);
  // default overlays are added via the customized leaflet-hash (see L.Hash.parseHash)
  // rk.poiLayers.problemLayerActive.addTo(rk.leafletMap);
  L.control.layers(baseMaps, overlayMaps, { 'position': 'topright', 'collapsed': true }).addTo(rk.leafletMap);

  rk.leafletMap.on({
    overlayadd: function (e) {
      let configuration = rk.configurations[rk.currentRegion];
      if (e.layer === rk.poiLayers.bikeShareLayer) {
        clearAndLoadNextbike(configuration.nextbikeUrl);
      }
      for (const [k, v] of Object.entries(rk.osmPoiTypes)) {
        if (e.layer === v.layer) {
          clearAndLoadOsmPois([k]);
        }
      }
    }
  });

  rk.geocodingControl = L.Control.geocoder({
    position: 'topright',
    placeholder: 'Adresssuche',
    errorMessage: 'Leider nicht gefunden',
    geocoder: L.Control.Geocoder.opencage({
      apiKey: "657bf10308f144c7a9cbb7675c9b0d36",
      geocodingQueryParams: {
        countrycode: 'at',
        language: 'de'
        // bounds are set whenever a JSON is read (min lon, min lat, max lon, max lat)
      }
    }),
    defaultMarkGeocode: false
  }).on('markgeocode', function (e) {
    let result = e.geocode || e;
    debug(result);

    let resultText = result.name;
    resultText = resultText.replace(/, Österreich$/, "").replace(/, /g, "<br/>");
    L.popup({
      autoClose: false,
      closeOnClick: false,
      closeButton: true
    }).setLatLng(result.center).setContent(resultText).openOn(rk.leafletMap);

    let roughlyHalfPopupWidth = 100; // TODO ideally get the real width of the popup
    let topLeft = L.point(document.querySelector('#sidebar').offsetWidth + roughlyHalfPopupWidth, 0);
    let bottomRight = L.point(document.querySelector('#radlobby-logo').offsetWidth + roughlyHalfPopupWidth, document.querySelector('#radlobby-logo').offsetHeight);
    rk.leafletMap.panInside(result.center, { "paddingTopLeft": topLeft, "paddingBottomRight": bottomRight });
  }).addTo(rk.leafletMap);

  L.control.locate({
    position: 'topright',
    setView: 'untilPan',
    flyTo: true,
    //markerStyle: { weight: 5 },
    locateOptions: {
      enableHighAccuracy: true,
      watch: true,
      maxZoom: 16
    },
    strings: {
      title: 'Verfolge Position'
    }
  }).addTo(rk.leafletMap);

  L.control.zoom({ position: 'topright' }).addTo(rk.leafletMap);

  L.control.scale({ position: 'topleft', imperial: false, maxWidth: 200 }).addTo(rk.leafletMap);

  let sidebar = L.control.sidebar({
    container: 'sidebar',
    position: 'left'
  }).addTo(rk.leafletMap);
  if (window.innerWidth < rk.fullWidthThreshold) {
    sidebar.close();
  }

  initializeIcons();

  // initialize hash, this causes loading of the default region
  // and positioning of the map
  // TODO: make L.Hash work again and uncomment the next line
  //new L.Hash(rk.leafletMap);
}

function initializeIcons() {
  rk.icons = {};
  rk.icons.dismount = L.icon({
    iconUrl: 'css/dismount.svg',
    iconSize: [33, 29],
    iconAnchor: [16.5, 14.5],
    popupAnchor: [0, -14.5]
  });
  rk.icons.warning = L.icon({
    iconUrl: 'css/warning.svg',
    iconSize: [33, 29],
    iconAnchor: [16.5, 14.5],
    popupAnchor: [0, -14.5]
  });
  rk.icons.noCargo = L.icon({
    iconUrl: 'css/nocargo.svg',
    iconSize: [29, 29],
    iconAnchor: [14.5, 14.5],
    popupAnchor: [0, -14.5]
  });
  rk.icons.noCargoAndDismount = L.icon({
    iconUrl: 'css/nocargo+dismount.svg',
    iconSize: [57.7, 29],
    iconAnchor: [28.85, 14.5],
    popupAnchor: [0, -14.5]
  });
  rk.icons.redDot = L.icon({
    iconUrl: 'css/reddot.svg',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -5]
  });
  rk.icons.swimming = L.icon({
    iconUrl: 'css/swimming.svg',
    iconSize: [29, 29],
    iconAnchor: [14.5, 14.5],
    popupAnchor: [0, -14.5]
  });
  rk.icons.swimmingSmall = L.icon({
    iconUrl: 'css/swimming_small.svg',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -5]
  });
  let subwaySize = 15;
  rk.icons.subway = L.icon({
    iconUrl: 'css/subway.svg',
    iconSize: [subwaySize, subwaySize],
    iconAnchor: [subwaySize / 2, subwaySize / 2],
    popupAnchor: [0, -subwaySize / 2]
  });
  rk.icons.sbahn = L.icon({
    iconUrl: 'css/sbahn.svg',
    iconSize: [subwaySize, subwaySize],
    iconAnchor: [subwaySize / 2, subwaySize / 2],
    popupAnchor: [0, -subwaySize / 2]
  });
  let railwaySize = 20;
  rk.icons.railway = L.icon({
    iconUrl: 'css/railway.svg',
    iconSize: [railwaySize, railwaySize],
    iconAnchor: [railwaySize / 2, railwaySize / 2],
    popupAnchor: [0, -railwaySize / 2]
  });

  rk.icons.nextbike = createMarkerIcon('css/nextbike.svg');
  rk.icons.nextbikeGray = createMarkerIcon('css/nextbike-gray.svg');
  rk.icons.wienmobilrad = createMarkerIcon('css/wienmobilrad.svg');
  rk.icons.wienmobilradGray = createMarkerIcon('css/wienmobilrad-gray.svg');
  rk.icons.citybikelinz = createMarkerIcon('css/citybikelinz.svg');
  rk.icons.citybikelinzGray = createMarkerIcon('css/citybikelinz-gray.svg');
  rk.icons.bicycleShop = createMarkerIcon('css/bicycleShop.svg');
  rk.icons.bicycleShopGray = createMarkerIcon('css/bicycleShop-gray.svg');
  rk.icons.bicycleRepairStation = createMarkerIcon('css/bicycleRepairStation.svg');
  rk.icons.bicycleRepairStationGray = createMarkerIcon('css/bicycleRepairStation-gray.svg');
  rk.icons.bicyclePump = createMarkerIcon('css/bicyclePump.svg');
  rk.icons.bicyclePumpGray = createMarkerIcon('css/bicyclePump-gray.svg');
  rk.icons.bicycleTubeVending = createMarkerIcon('css/bicycleTubeVending.svg');
  rk.icons.bicycleTubeVendingGray = createMarkerIcon('css/bicycleTubeVending-gray.svg');
  rk.icons.drinkingWater = createMarkerIcon('css/drinkingWater.svg');
  rk.icons.drinkingWaterGray = createMarkerIcon('css/drinkingWater-gray.svg');
}

function createMarkerIcon(url) {
  let markerWidth = 100 / 5;
  let markerHeight = 150 / 5;
  return L.icon({
    iconUrl: url,
    iconSize: [markerWidth, markerHeight],
    iconAnchor: [markerWidth / 2, markerHeight],
    popupAnchor: [0, -markerHeight]
  });
}

function createProblemMarkersIncludingPopup(geojsonPoint) {
  let icons = getProblemIcons(geojsonPoint.properties);
  if (icons == null) {
    return undefined;
  }
  let description = getProblemDescriptionText(geojsonPoint.properties);
  let latLng = L.geoJSON(geojsonPoint).getLayers()[0].getLatLng();
  let markers = {
    lowZoom: createMarkerIncludingPopup(latLng, icons.small, description, 'Problemstelle'),
    highZoom: createMarkerIncludingPopup(latLng, icons.large, description, 'Problemstelle')
  };
  return markers;
}


/**
 * @param properties GeoJSON properties of a point
 * @return a small and a large icon or undefined if no icons should be used
 */
function getProblemIcons(properties) {
  if (properties.leisure === 'swimming_pool') {
    return {
      small: rk.icons.swimmingSmall,
      large: rk.icons.swimming
    };
  }

  let dismount = properties.dismount === 'yes';
  let nocargo = properties.nocargo === 'yes';
  let warning = properties.warning === 'yes';

  let problemIcon;
  if (dismount && nocargo) {
    problemIcon = rk.icons.noCargoAndDismount;
  } else if (dismount) {
    problemIcon = rk.icons.dismount;
  } else if (nocargo) {
    problemIcon = rk.icons.noCargo;
  } else if (warning) {
    problemIcon = rk.icons.warning;
  }

  if (problemIcon === undefined) {
    return undefined;
  } else {
    return {
      small: rk.icons.redDot,
      large: problemIcon
    };
  }
}

/**
 * @param properties GeoJSON properties of a point
 * @return a description string
 */
function getProblemDescriptionText(properties) {
  let dismount = properties.dismount === 'yes';
  let nocargo = properties.nocargo === 'yes';
  let warning = properties.warning === 'yes';

  let title = "";
  if (dismount && nocargo) {
    title = 'Schiebestelle / untauglich für Spezialräder';
  } else if (dismount) {
    title = 'Schiebestelle';
  } else if (nocargo) {
    title = 'Untauglich für Spezialräder';
  } else if (warning) {
    title = 'Achtung';
  }

  const description = properties.description ? `<p>${properties.description}</p>` : "";

  return `<h2>${title}</h2>${description}`;
}

$( document ).ready(function() {
  loadLeaflet();
});
