const widthFunctionPriority0 = [
  "interpolate", ["linear"], ["zoom"],
  9, 1,
  20, 10
];

const widthFunctionPriority0OneWay = [
  "interpolate", ["linear"], ["zoom"],
  9,  2,
  20, 28
];

const widthFunctionPriority1And2OneWay = [
  "interpolate", ["linear"], ["zoom"],
  9,  1,
  20, 20
];

const widthFunctionUnpavedPriority1And2 = [
  "interpolate", ["linear"], ["zoom"],
  9, 1,
  20, 1.8
];

const lineColors = [
  "match", ["get", "stress"],
  "0", "#004B67",
  "1", "#51A4B6",
  "2", "#FF6600",
  "#000"
];

const linePatternOneway = [
  "match", ["get", "stress"],
  "0", "arrow_stress_0",
  "1", "arrow_stress_1",
  "2", "arrow_stress_2",
  "arrow"
];

const linePatternSteep = [
  "match", ["get", "stress"],
  "0", "bar_stress_0",
  "1", "bar_stress_1",
  "2", "bar_stress_2",
  "bar"
];


const lineDashArrayPriority0 = [2, 1.6];
const lineDashArrayPriority1And2 = [3, 3];



const getSteepLayersFor = function(sourceName){
  return [
    {
      "id": "priority0" + sourceName + "_steep",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["==", "steep", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": widthFunctionPriority0OneWay,
        "line-pattern": linePatternSteep
      }
    },
    {
      "id": "priority1" + sourceName + "_steep",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"], ["==", "steep", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": widthFunctionPriority1And2OneWay,
        "line-pattern": linePatternSteep
      },
      "minzoom": 12,
    },
    {
      "id": "priority2" + sourceName + "_steep",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"], ["==", "steep", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": widthFunctionPriority1And2OneWay,
        "line-pattern": linePatternSteep
      },
      "minzoom": 14,
    },
  ];
}


const getOneWayLayersFor = function(sourceName){
  return [
    {
      "id": "priority0" + sourceName + "_oneway",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["==", "oneway", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": widthFunctionPriority0OneWay,
        "line-pattern": linePatternOneway
      }
    },
    {
      "id": "priority1" + sourceName + "_oneway",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "1"], ["==", "oneway", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": widthFunctionPriority1And2OneWay,
        "line-pattern": linePatternOneway
      },
      "minzoom": 12,
    },
    {
      "id": "priority2" + sourceName + "_oneway",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "2"], ["==", "oneway", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-width": widthFunctionPriority1And2OneWay,
        "line-pattern": linePatternOneway
      },
      "minzoom": 14,
    },
  ];
}

const getUnpavedLayersFor = function (sourceName) {
  return [
    {
      "id": "priority0" + sourceName + "_unpaved",
      "type": "line",
      "source": sourceName,
      "filter": ["all", ["==", "priority", "0"], ["==", "unpaved", "yes"]],
      "paint": {
        "line-color": lineColors,
        "line-dasharray": lineDashArrayPriority0,
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
        "line-dasharray": lineDashArrayPriority1And2,
        "line-width": widthFunctionUnpavedPriority1And2
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
        "line-dasharray": lineDashArrayPriority1And2,
        "line-width": widthFunctionUnpavedPriority1And2
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
        "line-width": widthFunctionPriority0,
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
    ...getUnpavedLayersFor(sourceName),
    ...getOneWayLayersFor(sourceName),
    ...getSteepLayersFor(sourceName)
  ]
}


export default getRadlkarteLayersFor;
