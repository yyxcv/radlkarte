import getNormalLayersFor from "./path.js";
import getUnpavedLayersFor from "./path_unpaved.js";
import getOneWayLayersFor from "./path_oneway.js";
import getSteepLayersFor from "./path_steep.js";


const commonSettings = {
  minZoomForPriority1: 12,
  minZoomForPriority2: 14,
  lineColors: [
    "match", ["get", "stress"],
    "0", "#004B67",
    "1", "#51A4B6",
    "2", "#FF6600",
    "#000"
  ],
};


const getRadlkarteLayersFor = function (sourceName) {
  return [
    ...getNormalLayersFor(sourceName, commonSettings),
    ...getUnpavedLayersFor(sourceName, commonSettings),
    ...getOneWayLayersFor(sourceName, commonSettings),
    ...getSteepLayersFor(sourceName, commonSettings)
  ]
}

export default getRadlkarteLayersFor;
