import commonLayerSettings from "./commonLayerSettings.js";

const widthPriority0 = [
  "interpolate", ["linear"], ["zoom"],
  9, 1,
  20, 10
];

const widthPriority1And2 = [
  "interpolate", ["linear"], ["zoom"],
  9, 1,
  20, 1.8
];

const getNormalLayersFor = function (sourceName) {
  return [
    {
      "id": "priority0" + sourceName,
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["!=", "unpaved", "yes"]],
      "paint": {
        "line-color": commonLayerSettings.lineColors,
        "line-width": widthPriority0,
      }
    },
    {
      "id": "priority1" + sourceName,
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"], ["!=", "unpaved", "yes"]],
      "paint": {
        "line-color": commonLayerSettings.lineColors,
        "line-width": widthPriority1And2
      },
      "minzoom": commonLayerSettings.minZoomForPriority1,
    },
    {
      "id": "priority2" + sourceName,
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"], ["!=", "unpaved", "yes"]],
      "paint": {
        "line-color": commonLayerSettings.lineColors,
        "line-width": widthPriority1And2
      },
      "minzoom": commonLayerSettings.minZoomForPriority2,
    },
  ];
}

export default getNormalLayersFor;
