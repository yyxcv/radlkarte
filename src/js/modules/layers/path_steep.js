const linePattern = [
  "match", ["get", "stress"],
  "0", "bar_stress_0",
  "1", "bar_stress_1",
  "2", "bar_stress_2",
  "bar"
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

const getSteepLayersFor = function (sourceName, commonSettings) {
  return [
    {
      "id": "priority0" + sourceName + "_steep",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["==", "steep", "yes"]],
      "paint": {
        "line-color": commonSettings.lineColors,
        "line-width": widthPriority0,
        "line-pattern": linePattern
      }
    },
    {
      "id": "priority1" + sourceName + "_steep",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"], ["==", "steep", "yes"]],
      "paint": {
        "line-color": commonSettings.lineColors,
        "line-width": widthPriority1And2,
        "line-pattern": linePattern
      },
      "minzoom": commonSettings.minZoomForPriority1,
    },
    {
      "id": "priority2" + sourceName + "_steep",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"], ["==", "steep", "yes"]],
      "paint": {
        "line-color": commonSettings.lineColors,
        "line-width": widthPriority1And2,
        "line-pattern": linePattern
      },
      "minzoom": commonSettings.minZoomForPriority2,
    },
  ];
}

export default getSteepLayersFor;
