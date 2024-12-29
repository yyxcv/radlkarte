const widthFunctionPriority0 = [
  "interpolate", ["linear"], ["zoom"],
  9, 1,
  20, 10
];

const lineColors = [
  "match", ["get", "stress"],
  "0", "#004B67",
  "1", "#51A4B6",
  "2", "#FF6600",
  "#000"
];


const lineDashArray = [2.5, 3];

//steil
//einbahn

const getUnpavedLayersFor = function (sourceName) {
  return [
    {
      "id": "priority0" + sourceName + "_unpaved",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["==", "unpaved", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-dasharray": lineDashArray,
        "line-width": widthFunctionPriority0
      }
    },
    {
      "id": "priority1" + sourceName + "_unpaved",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"], ["==", "unpaved", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-dasharray": lineDashArray,
        "line-width": 1
      },
      "minzoom": 12,
    },
    {
      "id": "priority2" + sourceName + "_unpaved",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"], ["==", "unpaved", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-dasharray": lineDashArray,
        "line-width": 1
      },
      "minzoom": 14,
    },
  ];
}

const getPavedRadlkarteLayersFor = function (sourceName) {
  return [
    {
      "id": "priority0" + sourceName,
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["!=", "unpaved", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": widthFunctionPriority0
      }
    },
    {
      "id": "priority1" + sourceName,
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"],["!=", "unpaved", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": 1
      },
      "minzoom": 12,
    },
    {
      "id": "priority2" + sourceName,
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"],["!=", "unpaved", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": 1
      },
      "minzoom": 14,
    },
  ];
}


const getRadlkarteLayersFor = function (sourceName) {
  return [
    ...getPavedRadlkarteLayersFor(sourceName),
    ...getUnpavedLayersFor(sourceName)
  ]
}


export default getRadlkarteLayersFor;
