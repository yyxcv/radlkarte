import getNormalLayersFor from "./path_normal.js";
import getUnpavedLayersFor from "./path_unpaved.js";
import getOneWayLayersFor from "./path_oneway.js";
import getSteepLayersFor from "./path_steep.js";
import getDismountPointLayerFor from "./point_dismount.js";
import getNoCargoPointLayerFor from "./point_nocargo.js";
import getNoCargoDismountPointLayerFor from "./point_nocargo_dismount.js";
import getWarningPointLayerFor from "./point_warning.js";


const getRadlkarteLayersFor = function (sourceName) {
  return [
    ...getNormalLayersFor(sourceName),
    ...getUnpavedLayersFor(sourceName),
    ...getOneWayLayersFor(sourceName),
    ...getSteepLayersFor(sourceName),
    ...getDismountPointLayerFor(sourceName),
    ...getNoCargoPointLayerFor(sourceName),
    ...getNoCargoDismountPointLayerFor(sourceName),
    ...getWarningPointLayerFor(sourceName),
  ]
}

export default getRadlkarteLayersFor;
