import carto from "./layers/carto";
import getRadlkarteLayersFor from "./layers/radlkarte.js";

export const regionLayerNames = [
  "klagenfurt",
  "linz",
  "rheintal",
  "schwarzatal",
  "steyr",
  "wien",
];


const layers = [
  ...carto,
  ...getRadlkarteLayersFor(regionLayerNames[0]),
  ...getRadlkarteLayersFor(regionLayerNames[1]),
  ...getRadlkarteLayersFor(regionLayerNames[2]),
  ...getRadlkarteLayersFor(regionLayerNames[3]),
  ...getRadlkarteLayersFor(regionLayerNames[4]),
  ...getRadlkarteLayersFor(regionLayerNames[5]),
];


export default layers;
