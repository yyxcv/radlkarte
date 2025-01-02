import commonLayerSettings from "./commonLayerSettings.js";


const linePattern = [
  "match", ["get", "stress"],
  "0", "arrow_stress_0",
  "1", "arrow_stress_1",
  "2", "arrow_stress_2",
  "arrow"
];

const widthPriority0 = [
  "interpolate", ["linear"], ["zoom"],
  9, 2,
  20, 28
];

const widthPriority1And2 = [
  "interpolate", ["linear"], ["zoom"],
  9, 1,
  20, 20
];

const getOneWayLayersFor = function (sourceName) {
  return [
    {
      "id": "priority0" + sourceName + "_oneway",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["==", "oneway", "yes"]],
      "paint": {
        "line-color": commonLayerSettings.lineColors,
        "line-width": widthPriority0,
        "line-pattern": linePattern
      }
    },
    {
      "id": "priority1" + sourceName + "_oneway",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"], ["==", "oneway", "yes"]],
      "paint": {
        "line-color": commonLayerSettings.lineColors,
        "line-width": widthPriority1And2,
        "line-pattern": linePattern
      },
      "minzoom": commonLayerSettings.minZoomForPriority1,
    },
    {
      "id": "priority2" + sourceName + "_oneway",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"], ["==", "oneway", "yes"]],
      "paint": {
        "line-color": commonLayerSettings.lineColors,
        "line-width": widthPriority1And2,
        "line-pattern": linePattern
      },
      "minzoom": commonLayerSettings.minZoomForPriority2,
    },
  ];
}

export default getOneWayLayersFor;
