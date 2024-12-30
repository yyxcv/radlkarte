import getOneWayLayersFor from "./path_oneway.js";

const lineDashArrayPriority0 = [2, 1.6];
const lineDashArrayPriority1And2 = [3, 3];

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

const getUnpavedLayersFor = function (sourceName, commonSettings) {
  return [
    {
      "id": "priority0" + sourceName + "_unpaved",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["==", "unpaved", "yes"]],
      "paint": {
        "line-color": commonSettings.lineColors,
        "line-dasharray": lineDashArrayPriority0,
        "line-width": widthPriority0
      }
    },
    {
      "id": "priority1" + sourceName + "_unpaved",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"], ["==", "unpaved", "yes"]],
      "paint": {
        "line-color": commonSettings.lineColors,
        "line-dasharray": lineDashArrayPriority1And2,
        "line-width": widthPriority1And2
      },
      "minzoom": commonSettings.minZoomForPriority1,
    },
    {
      "id": "priority2" + sourceName + "_unpaved",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"], ["==", "unpaved", "yes"]],
      "paint": {
        "line-color": commonSettings.lineColors,
        "line-dasharray": lineDashArrayPriority1And2,
        "line-width": widthPriority1And2
      },
      "minzoom": commonSettings.minZoomForPriority2,
    },
  ];
}

export default getUnpavedLayersFor;
